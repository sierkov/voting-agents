import { getData } from '$lib/account';
import { proposalsForAllCategories, proposalsGetRecommended, proposalCategories, proposalCategoriesExt, proposalCategoryColors } from '$lib/proposal';
import { XORWow } from 'random-seedable';

export async function get({ locals, url }) {
    const rnd = url.searchParams.has('rnd') ? parseInt(url.searchParams.get('rnd')) : Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
    const catProposals = {};
    const catCounts = {};
    for (const [catId, props] of Object.entries(await proposalsForAllCategories())) {
        const random = new XORWow(rnd);
        const sortedProps = Array.from(props).sort((a, b) => 0.5 - random.float());
        catCounts[catId] = sortedProps.length;
        catProposals[catId] = sortedProps.slice(0, 5);
    }
    const catRandom = new XORWow(rnd);
    const sortedCatProposals = Array.from(Object.entries(catProposals)).sort((a, b) => 0.5 - catRandom.float());
    const myRanking = await getData(locals?.user?.email, 'ranking') ?? [];
    
    return {
        body: {
            rnd,
            categories: proposalCategories(),
            categoryColors: proposalCategoryColors(),
            categoriesExt: proposalCategoriesExt(),
            recommended: (await proposalsGetRecommended(locals?.user?.email, myRanking)).slice(0, 5),
            catCounts,
            catProposals,
            sortedCatProposals,
            myRanking
        }
    };
}
