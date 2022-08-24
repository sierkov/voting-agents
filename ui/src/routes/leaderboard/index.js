import sql from '/workspace/lib/js/db';
import { proposalGetMany, proposalCategories, proposalCategoryColors, proposalCategoriesExt } from '$lib/proposal';
import { votingCycleId, projectPublicId } from '$lib/constants';

export async function get({}) {
    const leaderboardRaw = await sql `
        SELECT prp.public_id AS id, SUM(uv.vote_power) vote_power
            FROM user_votes uv
                LEFT JOIN proposals prp ON (uv.proposal_id=prp.id)
                LEFT JOIN projects prj ON (prj.id=prp.project_id)
            WHERE uv.vote_cycle_id=${votingCycleId} AND prj.public_id=${projectPublicId}
            GROUP BY 1
            ORDER BY 2 DESC
            LIMIT 11`;
    const leaderboardMap = Object.fromEntries(leaderboardRaw.map(p => [p.id, p]));
    const leaderboard = (await proposalGetMany(leaderboardRaw.map(p => p.id))).map(p => ({ ...p, adaBalance: leaderboardMap[p.id].vote_power }));
    return {
        body: {
            categories: proposalCategories(),
            categoryColors: proposalCategoryColors(),
            categoriesExt: proposalCategoriesExt(),
            leaderboard
        }
    };
}
