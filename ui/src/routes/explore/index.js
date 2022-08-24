import { getData } from '$lib/account';
import { proposalsForCategory, proposalCategories, proposalCategoryColors } from '$lib/proposal';
import { XORWow } from 'random-seedable';

export async function get({ url, locals }) {
    const rnd = url.searchParams.has('rnd') ? parseInt(url.searchParams.get('rnd')) : Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
    const category = url.searchParams.get('cat');
    let page = parseInt(url.searchParams.get('p'));
    if (!page || page < 1) page = 1;
    let pageSize = parseInt(url.searchParams.get('ps'));
    if (!pageSize || pageSize < 10) pageSize = 10;
    const catProposals = Array.from(await proposalsForCategory(category));
    const random = new XORWow(rnd);
    catProposals.sort((a, b) => 0.5 - random.float());
    const pageProposals = catProposals.slice((page - 1) * pageSize, page * pageSize);
    
    return {
        body: {
            rnd,
            proposals: pageProposals,
            categories: proposalCategories(),
            categoryColors: proposalCategoryColors(),
            myRanking: await getData(locals?.user?.email, 'ranking') ?? [],
            category,
            page,
            pageSize,
            totalItems: catProposals.length
        }
    };
}
