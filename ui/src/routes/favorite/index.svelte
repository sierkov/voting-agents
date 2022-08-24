<script context="module">
    export async function load({ session, props, url }) {
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
    import { goto, invalidate } from '$app/navigation';
    import Button from '@smui/button';
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
    let oldRanking = [ ... myRanking ];
    let propById = Object.fromEntries(proposals.map(p => [p.id, p]));

    function makeNewUrl() {
        let urlNew = url.pathname;
        const params = new URLSearchParams();
        if (page && page !== 1) params.append('p', page);
        if (pageSize && pageSize !== 10) params.append('ps', pageSize);
        if (params.toString().length) urlNew += '?' + params.toString();
        return [urlNew, params];
    }

    async function renavigate() {
        const [urlNew, params] = makeNewUrl();
        if (params.toString() !== url.searchParams.toString() && !renav) {
            renav = true;
            console.log('renavigate goto:', urlNew);
            await goto(urlNew);
            renav = false;
        }
    }

    async function compareRanking(newRanking, oldRanking) {
        if (newRanking.length === oldRanking.length && newRanking.every((value, index) => value === oldRanking[index])) return;
        const [urlNew, params] = makeNewUrl();
        await invalidate(urlNew);
    }

    if (browser) renavigate();

    $: compareRanking(myRanking, oldRanking); // needed for the case of multi-page list of favorites
    $: sortedProposals = myRanking.map(pid => propById[pid]).filter(p => p);
    $: $myRankingShared = myRanking;
</script>

<ProposalPage
    breadcrumbsPath={[{ name: 'My shortlist', icon: 'favorite' } ]}
    {error} proposals={sortedProposals} {categories} {categoryColors} shortlist={false} bind:myRanking {totalItems} bind:pageSize bind:page {renavigate}
    empty="Your personal ranking of projects is empty."
>
    <div class="section submit">
        <div class="container row">
            <h4>Once you are satisfied with your choice, don't forget to submit your vote!</h4>
            <Button color="primary" variant="unelevated" class="submit-btn" href="/vote/submit">submit</Button>
        </div>
    </div>
</ProposalPage>

<style lang="scss">
    .section.submit {
        background-color: #000063;
        color: #fff;

        h4 {
            margin: 0;
        }

        :global(.submit-btn) {
            flex-grow: 0;
            flex-shrink: 0;
            background-color: #FFEB3B;
            color: #000063;
            font-weight: 700;
        }
    }
</style>