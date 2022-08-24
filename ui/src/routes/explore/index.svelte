<script context="module">
    export async function load({ session, props, url }) {
        if (!session?.user) {
            return {
                status: 302,
                redirect: "/"
            }
        }
        if (!url.searchParams.has('cat')) {
            return {
                status: 302,
                redirect: "/discover"
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

    export let rnd;
    export let url;
    export let proposals;
    export let categories;
    export let categoryColors;
    export let category;
    export let myRanking;
    export let page;
    export let pageSize;
    export let totalItems;
    let error, renav;

    async function renavigate() {
        let urlNew = url.pathname;
        const params = new URLSearchParams();
        if (url.searchParams.has('cat')) params.append('cat', category);
        params.append('rnd', rnd);
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

    function toTitleCase(str) {
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    }

    if (browser) renavigate();

    $: $myRankingShared = myRanking;
</script>

<ProposalPage
    breadcrumbsPath={[ { name: toTitleCase(category ? categories[category] : 'uncategorized'), icon: 'folder_open' } ]}
    {rnd}
    {error} {proposals} {categories} {categoryColors} {myRanking} {totalItems} bind:pageSize bind:page {renavigate}
>
</ProposalPage>
