__all__ = ['rank']

import itertools
import numpy as np
from sklearn.linear_model import LogisticRegression

from .sort import sort_merge

PAIR_POS_BASE_PID = 0
PAIR_POS_ALT_PID = 1
PAIR_POS_BASE_IS_BETTER = 2

def make_pairs(prop_stats):
    rank_pairs = []
    for base_meta, alt_meta in itertools.combinations(prop_stats, 2):
        pair = [ base_meta['pid'], alt_meta['pid'], None ]
        # If the user has explicitly ranked the proposal this has the highest priority
        if base_meta['rank_idx'] is not None:
            if alt_meta['rank_idx'] is None or base_meta['rank_idx'] < alt_meta['rank_idx']:
                pair[PAIR_POS_BASE_IS_BETTER] = True
            else:
                pair[PAIR_POS_BASE_IS_BETTER] = False
        elif alt_meta['rank_idx'] is not None:
            pair[PAIR_POS_BASE_IS_BETTER] = False
        # if there is no explicit rank check proposals users took time to review
        #if pair[PAIR_POS_BASE_IS_BETTER] is None and base_meta['num_full_views'] != alt_meta['num_full_views']:
        #    pair[PAIR_POS_BASE_IS_BETTER] = base_meta['num_full_views'] > alt_meta['num_full_views']
        # if proposals were not reviewed, check how many times users have skipped the chance to review
        #if pair[PAIR_POS_BASE_IS_BETTER] is None and base_meta['num_card_views'] != alt_meta['num_card_views']:
        #    pair[PAIR_POS_BASE_IS_BETTER] = base_meta['num_card_views'] < alt_meta['num_card_views']
        if pair[PAIR_POS_BASE_IS_BETTER] is not None:
            rank_pairs.append(pair)
    final_pairs = []
    for pair in rank_pairs:
        final_pairs.append((pair[PAIR_POS_BASE_PID], pair[PAIR_POS_ALT_PID], pair[PAIR_POS_BASE_IS_BETTER]))
        final_pairs.append((pair[PAIR_POS_ALT_PID], pair[PAIR_POS_BASE_PID], not pair[PAIR_POS_BASE_IS_BETTER]))
    return final_pairs

PROP_POS_PID = 0
PROP_POS_EMB = 1

def rank(prop_stats, pid_to_embedding, make_x):
    user_pairs = make_pairs(prop_stats)
    ranker = LogisticRegression()
    ranker.fit(list(map(make_x, user_pairs)), list(map(lambda p: p[PAIR_POS_BASE_IS_BETTER], user_pairs)))

    def rank_cmp(a, b):
        pred = ranker.predict([ make_x((a, b, None)) ])
        return pred[0]

    proposals = list(pid_to_embedding.keys())
    ranked = sort_merge(proposals, rank_cmp)
    return ranked
