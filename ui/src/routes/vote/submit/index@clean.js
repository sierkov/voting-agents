import { getData } from '$lib/account';
import { proposalGetMany, proposalCategories, proposalCategoryColors, proposalCategoriesExt } from '$lib/proposal';

export async function get({ locals }) {
    const [myRanking, myBalance ] = await Promise.all([
        getData(locals?.user?.email, 'ranking').then(p => p ?? []),
        getData(locals?.user?.email, 'cardano-address')
    ]);
    const myVote = myRanking.slice(0, 3);
    const proposals = await proposalGetMany(myVote);
    
    return {
        body: {
            categories: proposalCategories(),
            categoryColors: proposalCategoryColors(),
            categoriesExt: proposalCategoriesExt(),
            proposals,
            myRanking,
            myVote,
            myBalance
        }
    };
}
