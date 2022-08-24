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
    import { page } from '$app/stores';
    import { goto, afterNavigate } from '$app/navigation';
    import Button from '@smui/button';
    import { Icon } from '@smui/common';
    import SearchBlock from '../../lib/component/search-block.svelte';
    import ProposalSection from '$lib/component/proposal-section.svelte';
    import myRankingShared from '$lib/client/myranking';
    import Footer from '$lib/component/footer.svelte';

    export let url;
    export let rnd;
    export let categories;
    export let categoriesExt;
    export let categoryColors;
    export let catProposals;
    export let sortedCatProposals;
    export let recommended;
    export let myRanking;

    let renav, cat1, cat2, cat3;
    updateShownCategories();

    async function renavigate() {
        let urlNew = url.pathname;
        const params = new URLSearchParams();
        params.append('rnd', rnd);
        urlNew += '?' + params.toString();
        if (params.toString() !== url.searchParams.toString() && !renav) {
            renav = true;
            console.log('renavigate goto:', urlNew);
            await goto(urlNew);
            renav = false;
        }
    }

    async function refreshSelectedCategories() {
        rnd = Math.round(Math.random() * Number.MAX_SAFE_INTEGER);
        await renavigate();
    }

    function updateShownCategories() {
        cat1 = sortedCatProposals[0][0];
        cat2 = sortedCatProposals[1][0];
        cat3 = sortedCatProposals[2][0];
    }

    if (browser) renavigate();

    afterNavigate(updateShownCategories);

    $: $myRankingShared = myRanking;
</script>

<SearchBlock query={$page?.url?.searchParams?.get('q')}></SearchBlock>
<ProposalSection title="Recommended" proposals={recommended} large={true} bgColor="#f8f8f8" {categories} {categoryColors} {myRanking} viewAllLink="/recommended">
    <h3>No suggestions yet - explore first!</h3>
    <p>Open several relevant proposals; decide if any is worth to be added to your personal favorites. Suggestions will come right after!</p>
</ProposalSection>
<div class="section">
    <div  style="display: flex; align-items: center; gap: 32px">
        <h2 style="margin: 0">Explore By Topic</h2>
        <Button on:click={refreshSelectedCategories}>
            <Icon class="material-icons">refresh</Icon> Refresh categories
        </Button>
    </div>
</div>

<ProposalSection bgColor='#f0f0f0' proposals={catProposals[cat1]} bind:catId={cat1} {categoriesExt} {categories} {categoryColors} {myRanking} viewAllLink={'/explore?cat=' + encodeURIComponent(cat1) + '&rnd=' + encodeURIComponent(rnd)}></ProposalSection>
<ProposalSection bgColor='#f8f8f8' proposals={catProposals[cat2]} bind:catId={cat2} {categoriesExt} {categories} {categoryColors} {myRanking} viewAllLink={'/explore?cat=' + encodeURIComponent(cat2) + '&rnd=' + encodeURIComponent(rnd)}></ProposalSection>
<ProposalSection bgColor='#f0f0f0' proposals={catProposals[cat3]} bind:catId={cat3} {categoriesExt} {categories} {categoryColors} {myRanking} viewAllLink={'/explore?cat=' + encodeURIComponent(cat3) + '&rnd=' + encodeURIComponent(rnd)}></ProposalSection>

<div class="section">
    <Button on:click={refreshSelectedCategories}><Icon class="material-icons">refresh</Icon> Refresh categories</Button>
</div>
<Footer></Footer>

<style lang="scss">
    :global(.material-icons) {
        color: inherit;
    }
</style>