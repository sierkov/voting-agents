<script>
    import Breadcrumbs from '$lib/component/breadcrumbs.svelte';
    import Pagination from '$lib/component/pagination.svelte';
    import ProposalList from '$lib/component/proposal-list.svelte';
    import Footer from '$lib/component/footer.svelte';

    export let rnd;
    export let breadcrumbsPath;
    export let error;
    export let empty;
    export let proposals;
    export let categories;
    export let categoryColors;
    export let myRanking;
    export let totalItems;
    export let page;
    export let pageSize;
    export let renavigate;
    export let shortlist;
</script>

<Breadcrumbs path={breadcrumbsPath} {rnd}></Breadcrumbs>
<slot/>
<div class="section">
    {#if error}
        <p class="error">{error}</p>
    {/if}
    {#if proposals?.length}
        <ProposalList {proposals} {shortlist} {categories} {categoryColors} bind:myRanking></ProposalList>
        <div style="padding: 16px 0px">
            <Pagination pageSizes={[10, 25, 50, 100]} {totalItems} bind:pageSize bind:page on:update={renavigate} />
        </div>
    {:else if empty}
        <p>{empty}</p>
    {/if}
</div>
<Breadcrumbs path={breadcrumbsPath} {rnd}></Breadcrumbs>
<Footer></Footer>