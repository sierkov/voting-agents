import json
import logging
from threading import Thread
import torch
import traceback
from time import time, sleep
from sentence_transformers import SentenceTransformer, util
import flask
from flask import request
from flask_mail import Mail, Message

TORCH_DEVICE = 'cpu'
SEARCH_EMBEDDINGS_PATH = '/workspace/data/search/_embeddings.pkl'

init_start_time = time()
logging.basicConfig(filename='/workspace/logs/ml-ranking-api.log', level=logging.INFO)

# Init flask
app = flask.Flask(__name__)
app.config['DEBUG'] = False
app.config['MAX_CONTENT_LENGTH'] = 4 * 1024 * 1024
app.config['MAIL_USE_TLS'] = True

# Init mail sender
with open('/workspace/etc/secret-mail-server.json', 'r', encoding='utf8') as f: mail_conf = json.load(f)
app.config['MAIL_SERVER'] = mail_conf['host']
app.config['MAIL_USERNAME'] = mail_conf['user']
app.config['MAIL_PASSWORD'] = mail_conf['pass']
mail = Mail(app)

# Precomputed similar proposals
with open('/workspace/data/similarity/_top9.json', 'r', encoding='utf8') as f: similar_props = json.load(f)

# Init semantic search
embedder = SentenceTransformer('multi-qa-mpnet-base-dot-v1', device=TORCH_DEVICE)
with open(SEARCH_EMBEDDINGS_PATH, 'rb') as f:
    (prop_ids, embeddings) = torch.load(f, map_location=torch.device(TORCH_DEVICE))
prop_id_to_idx = dict(map(lambda iv: (iv[1], iv[0]), enumerate(prop_ids)))

# Init user-ranking recomputation
def personalied_ranking_updater():
    from collections import defaultdict
    import json
    import numpy as np
    import pickle
    import psycopg2
    import psycopg2.extras
    import sys
    if '/workspace/lib/py' not in sys.path: sys.path.append('/workspace/lib/py')
    from va.rank import rank

    with open('/workspace/data/ranking/_embeddings.pkl', 'rb') as f: pid_to_embedding = pickle.load(f)

    def make_x_concat(pair):
        return np.concatenate((pid_to_embedding[pair[0]], pid_to_embedding[pair[1]]))

    while True:
        try:
            conn = psycopg2.connect(host='db', dbname='vadb', user='va', password='202207')
            cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
            cur.execute('''
                SELECT ud1.user_id AS user_id, ud1.data_value AS new_data_at, ud2.data_value AS updated_at
                    FROM user_data ud1
                    LEFT JOIN user_data ud2 ON (ud1.user_id=ud2.user_id AND ud2.data_name=%s)
                    WHERE ud1.data_name=%s AND (ud2.data_value IS NULL OR (ud1.data_value#>>'{}')::FLOAT8 > (ud2.data_value#>>'{}')::FLOAT8)''',
                    ('suggested-proposals-updated-at', 'suggested-proposals-new-data-at'))
            statuses = cur.fetchall()
            for status in statuses:
                user_id = status['user_id']
                logging.info(f'updater-thread: Updating suggestions for user {user_id}')
                update_start_time = time()
                cur.execute('''
                    SELECT prj.public_id || ':' || prp.public_id AS proposal_pub_id, COUNT(1) num_card_views, MIN(prp.description) description
                        FROM user_proposal_card_views upcv
                        LEFT JOIN proposals prp ON (upcv.proposal_id=prp.id)
                        LEFT JOIN projects prj ON (prp.project_id=prj.id)
                        WHERE user_id=%s
                        GROUP BY 1''', (user_id, ))
                card_views = cur.fetchall()
                cur.execute('''
                    SELECT prj.public_id || ':' || prp.public_id AS proposal_pub_id, COUNT(1) num_full_views
                        FROM user_proposal_views upv
                        LEFT JOIN proposals prp ON (upv.proposal_id=prp.id)
                        LEFT JOIN projects prj ON (prp.project_id=prj.id)
                        WHERE user_id=%s
                        GROUP BY 1''', (user_id, ))
                full_views = cur.fetchall()
                cur.execute("SELECT data_value FROM user_data WHERE user_id=%s AND data_name='ranking' AND data_value IS NOT NULL", (user_id, ))
                ranked = cur.fetchone()
                if ranked:
                    ranked = list(map(lambda p: { 'proposal_pub_id': 'catalyst_best:' + p[1], 'rank_idx': p[0] }, enumerate(json.loads(ranked['data_value']))))
                else:   
                    ranked = []
                user_stats = defaultdict(lambda: { 'num_card_views': 0, 'num_full_views': 0, 'rank_idx': None })
                for row in card_views:
                    user_stats[row['proposal_pub_id']]['num_card_views'] = row['num_card_views']
                    user_stats[row['proposal_pub_id']]['description'] = row['description']
                for row in full_views:
                    user_stats[row['proposal_pub_id']]['num_full_views'] = row['num_full_views']
                for row in ranked:
                    user_stats[row['proposal_pub_id']]['rank_idx'] = row['rank_idx']
                for pid, meta in user_stats.items():
                    meta['pid'] = pid
                ranked_pids = rank(list(user_stats.values()), pid_to_embedding, make_x_concat)
                cur.execute('''
                    INSERT INTO user_data (user_id, data_name, data_value)
                        VALUES(%s, %s, %s)
                        ON CONFLICT (user_id, data_name) DO UPDATE SET data_value=EXCLUDED.data_value
                    ''', (user_id, 'suggested-proposals', json.dumps(ranked_pids[:100])))
                cur.execute('''
                    INSERT INTO user_data (user_id, data_name, data_value)
                        VALUES(%s, %s, %s)
                        ON CONFLICT (user_id, data_name) DO UPDATE SET data_value=EXCLUDED.data_value
                    ''', (user_id, 'suggested-proposals-updated-at', json.dumps(update_start_time)))
                conn.commit()
                logging.info(f'updater-thread: updated user {user_id} suggestion with data size: {len(user_stats)} in {time() - update_start_time} secs')
        except Exception as ex:
            logging.error('updater-thread: ERROR:' + traceback.format_exception(None, ex, ex.__traceback__))
        sleep(5.0)

Thread(target=personalied_ranking_updater, daemon=True).start()
logging.info(f'Initializing API took {round(time() - init_start_time, 3)} secs')

def catch_errors(handler):
    try:
        return handler()
    except Exception as ex:
        logging.error('stacktrace: ' + traceback.format_exception(None, ex, ex.__traceback__))
        logging.error(ex)
        return (f'Failed to process request {request.method} {request.url}', 500)

@app.route('/search', methods=['GET'])
def search():
    def handler():
        start_time = time()
        for k in ['query']:
            if k not in request.args:
                app.logger.error('test_get - not enough params: %s' % (json.dumps(request.args)))
                return ('Required parameters are missing', 400)
        query = request.args['query']
        logging.info(f'/search with query {query}, looking for best matches')
        query_emb = embedder.encode(query, convert_to_tensor=True)
        scores = util.dot_score(query_emb, embeddings)[0]
        results = torch.topk(scores, k=100)
        resp = []
        for score, idx in zip(results[0].tolist(), results[1].tolist()):
            pid = prop_ids[idx]
            resp.append({ 'pid': pid, 'score': score })
        logging.info(f'/search with query {query}, returning {len(resp)} results, processing took {round(time() - start_time, 3)} secs')
        return (json.dumps(resp), 200)
    return catch_errors(handler)

@app.route('/similar', methods=['GET'])
def similar():
    def handler():
        start_time = time()
        for k in ['pid']:
            if k not in request.args:
                app.logger.error('test_get - not enough params: %s' % (json.dumps(request.args)))
                return ('Required parameters are missing', 400)
        pid = request.args['pid']
        logging.info(f'/similar {pid}, looking for most similar proposals')
        if pid not in similar_props:
            logging.warn(f'/similar Unknown pid {pid}')
            return ('Unknown proposal id', 400)
        resp = similar_props[pid]
        logging.info(f'proposals similar to {pid}: {resp}')
        logging.info(f'/similar for proposal {pid} took {round(time() - start_time, 3)} secs')
        return (json.dumps(resp), 200)
    return catch_errors(handler)

def send_verify_email(email, secret):
    msg = Message(
        subject="Voting Agents - Your Sign In Code",
        sender="info@votingagents.org",
        recipients=[email],
        body=f'''
Hi,

Moments ago, someone has entered your email to request a sign in link at https://votingagents.org/
By entering the following code, you will connect your future activity on votingagents.org with this email address.
If you haven't requested the code, simply ignore this email. We won't be sending you any follow ups.

Your secret code: {secret}
Please note that the letters in the code are case sensitive, so it's better to copy and paste it!

Your Voting Agents Team.
''')
    mail.send(msg)

@app.route('/verify-email', methods=['POST'])
def verify_email():
    def handler():
        params = request.get_json()
        for k in ['email', 'secret']:
            if k not in params:
                app.logger.error(f'{request.url}: not enough params: %s' % (json.dumps(params)))
                return ('Required parameters are missing', 500)
        send_verify_email(params['email'], params['secret'])
        return ('OK', 200)
    return catch_errors(handler)

@app.route('/update-suggestions', methods=['POST'])
def update_suggestions():
    def handler():
        params = request.get_json()
        for k in ['email', 'secret']:
            if k not in params:
                app.logger.error(f'{request.url}: not enough params: %s' % (json.dumps(params)))
                return ('Required parameters are missing', 500)
        send_verify_email(params['email'], params['secret'])
        return ('OK', 200)
    return catch_errors(handler)

def main():
    app.run(host='0.0.0.0', port=5000, threaded=False, processes=1, use_reloader=False)

if __name__ == '__main__':
    main()
