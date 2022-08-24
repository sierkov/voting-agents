import { getData } from '$lib/account';
import { proposalGetMany, proposalCategories, proposalCategoryColors } from '$lib/proposal';

export async function get({ url, locals }) {
    try {
        const query = url.searchParams.get('q');
        let page = parseInt(url.searchParams.get('p'));
        if (!page || page < 1) page = 1;
        let pageSize = parseInt(url.searchParams.get('ps'));
        if (!pageSize || pageSize < 10) pageSize = 10;
        let results = [];
        if (query) {
            const res = await fetch('http://api:5000/search?query=' + encodeURIComponent(query));
            results = await res.json();
        }
        const proposals = (await proposalGetMany(results.map(r => r.pid))).filter(p => p).slice((page - 1) * pageSize, page * pageSize);
        return {
            status: 200,
            body: {
                query: query ?? '',
                proposals,
                categories: proposalCategories(),
                categoryColors: proposalCategoryColors(),
                myRanking: await getData(locals?.user?.email, 'ranking') ?? [],
                page,
                pageSize,
                totalItems: results.length
            }
        }
    } catch (err) {
        console.error(err);
        return {
            status: '500',
            body: 'Internal server error'
        }
    }
}
