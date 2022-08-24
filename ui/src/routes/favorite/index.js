import { getData } from '$lib/account';
import { proposalGetMany, proposalCategories, proposalCategoryColors } from '$lib/proposal';

export async function get({ url, locals }) {
    let page = parseInt(url.searchParams.get('p'));
    if (!page || page < 1) page = 1;
    let pageSize = parseInt(url.searchParams.get('ps'));
    if (!pageSize || pageSize < 10) pageSize = 10;
    const myRanking = await getData(locals?.user?.email, 'ranking') ?? [];
    const proposals = await proposalGetMany(myRanking);
    const pageProposals = proposals.slice((page - 1) * pageSize, page * pageSize);
    return {
        body: {
            proposals: pageProposals,
            categories: proposalCategories(),
            categoryColors: proposalCategoryColors(),
            myRanking,
            page,
            pageSize,
            totalItems: proposals.length
        }
    };
}
