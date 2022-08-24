<script context="module">
    export async function load({ session, props, url }) {
        console.log('load', Date.now());
        if (!session?.user) {
            return {
                status: 302,
                redirect: "/"
            }
        }
        return {
            props: {
                ...props,
                url,
                user: session.user
            }
        };
    }
</script>
<script>
    import { browser } from '$app/env';
    import { goto } from '$app/navigation';
    import ProposalPage from '$lib/component/proposal-page.svelte';
    import myRankingShared from '$lib/client/myranking';

    export let url;
    export let proposals;
    export let categories;
    export let categoryColors;
    export let myRanking;
    export let page;
    export let pageSize;
    export let totalItems;
    let error, renav;

    async function renavigate() {
        let urlNew = url.pathname;
        const params = new URLSearchParams();
        if (page && page !== 1) params.append('p', page);
        if (pageSize && pageSize !== 10) params.append('ps', pageSize);
        if (params.toString().length) urlNew += '?' + params.toString();
        if (params.toString() !== url.searchParams.toString() && !renav) {
            renav = true;
            console.log('renavigate goto:', urlNew);
            await goto(urlNew);
            renav = false;
        }
    }

    if (browser) renavigate();

    $: $myRankingShared = myRanking;
</script>

<ProposalPage
    breadcrumbsPath={[ { name: 'Recommended', icon: 'star' } ]}
    {error} {proposals} {categories} {categoryColors} {myRanking} {totalItems} bind:pageSize bind:page {renavigate}
>
</ProposalPage>
