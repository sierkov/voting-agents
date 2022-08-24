import { proposalGet, proposalGetMany, proposalCategories, proposalCategoryColors } from "$lib/proposal";
import { getData } from '$lib/account';

export async function get({ params, locals }) {
    const categories = proposalCategories();
    const prop = await proposalGet(params.id);
    const resp = await fetch(
        `http://api:5000/similar?pid=${encodeURIComponent(params.id)}`,
        { headers: { 'Accept': 'application/json' } }
    );
    const similar = resp.ok ? await resp.json() : [];
    const proposals = await proposalGetMany(similar);
    const myRanking = await getData(locals?.user?.email, 'ranking') ?? [];
    return {
        status: 200,
        body: {
            prop,
            categories,
            categoryColors: proposalCategoryColors(),
            myRanking,
            similar: proposals
        }
    };
}
