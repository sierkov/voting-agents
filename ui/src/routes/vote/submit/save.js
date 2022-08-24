import sql from '/workspace/lib/js/db';
import { getData } from '$lib/account';
import { votingPower, votingCycleId, projectPublicId } from '$lib/constants';

class UserException {
    constructor(userMsg) {
        this.userMsg = userMsg;
    }
}

export async function post({ locals }) {
    console.log('votingPower:', votingPower);
    try {
        const [myRanking, myBalance ] = await Promise.all([
            getData(locals?.user?.email, 'ranking').then(p => p ?? []),
            getData(locals?.user?.email, 'cardano-address')
        ]);
        const newVote = myRanking.slice(0, votingPower.length);
        console.log('newVote:', newVote);
        if (!newVote?.length >= 1) throw new UserException('Your vote cannot be empty!');
        if (!myBalance?.adaBalance) throw new UserException('Your associated Cardano wallet cannot be empty!');    
        const oldVote = await sql`
            SELECT u.id user_id, COUNT(uv.proposal_id) AS num_votes
                FROM users u
                    LEFT JOIN user_votes uv ON (u.id=uv.user_id AND uv.vote_cycle_id=${votingCycleId})
                WHERE u.email=${locals?.user?.email}
                GROUP BY u.id`;
        console.log('oldVote:', oldVote);
        if (oldVote.length && oldVote[0]?.num_votes > 0) throw new UserException('Your vote has already been submitted. You can submit a vote only once per voting cycle.');
        const proposals = await sql`
            SELECT prp.id AS proposal_id, prp.public_id public_id
                FROM projects prj
                    LEFT JOIN proposals prp ON (prj.id=prp.project_id AND prp.public_id IN ${sql(newVote)})
                WHERE prj.public_id=${projectPublicId}`;
        console.log('proposalIds:', proposals);
        if (proposals.length !== newVote.length) throw new UserException(`Not all voted proposals are active. Please, check if some of selected proposal were deactivated.`);
        const pidMap = Object.fromEntries(proposals.map(p => [ p.public_id, p.proposal_id ]));
        console.log('pidMap:', pidMap);
        await sql.begin(async (sql) => {
            for (const [idx, pid] of newVote.entries()) {
                await sql`
                    INSERT INTO user_votes (user_id, proposal_id, vote_cycle_id, vote_power, created_at)
                        VALUES (${oldVote[0]?.user_id}::BIGINT, ${pidMap[pid]}, ${votingCycleId}, ${Math.round(10 * myBalance?.adaBalance * votingPower[idx]) / 10}::NUMERIC, CURRENT_TIMESTAMP)`;
            }
        });
        return {
            status: 200,
            body: {
                balance: myBalance,
                vote: newVote
            }
        };
    } catch (exc) {
        console.error(exc, exc?.stack);
        let userMsg = 'Our server has exeprienced an internal error. Please, try again.';
        if (exc instanceof UserException) userMsg = exc.userMsg;
        return {
            status: 200,
            body: {
                error: userMsg
            }
        };
    }
}
