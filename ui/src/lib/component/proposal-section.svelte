<script>
    import Button from '@smui/button';
    import ProposalCard from '$lib/component/proposal-card.svelte';
    import ProposalCategoryList from '$lib/component/proposal/category-list.svelte';
    export let title;
    export let bgColor = '#fff';
    export let catId;
    export let categoriesExt;
    export let proposals;
    export let categories;
    export let categoryColors;
    export let myRanking;
    export let viewAllLink;
    export let large = false;
</script>

<div class="section props" style="background-color: {bgColor}">
    {#if title}
        <h2 class="title" class:h3={!large}>
                <a
                    href={viewAllLink}>{title}
                </a>
        </h2>
    {:else if catId !== undefined && categoriesExt}
        <ProposalCategoryList bind:catId {categoriesExt}></ProposalCategoryList>
    {/if}
    {#if proposals?.length}
        <div class="card-row list">
            {#each proposals as prop}
                <ProposalCard {prop} {categories} {categoryColors} {myRanking} {large}></ProposalCard>
            {/each}
            <Button class="view-all" href={viewAllLink}>View all</Button>
        </div>
    {:else if $$slots.default}
        <slot/>
    {:else}
        <h3>Empty</h3>
        <p>No matching proposals have beend found.</p>
    {/if}
</div>

<style lang="scss">
    .section.props {
        margin-top: 0;
        .title {
            text-transform: capitalize;
        }
        .list {
            position: relative;
            padding-bottom: 16px;
            overflow-x: auto;
            overflow-y: hidden;
            flex-wrap: nowrap;
            justify-content: flex-start;

            :global(.view-all) {
                align-self: center;
            }
        }
    }
</style>