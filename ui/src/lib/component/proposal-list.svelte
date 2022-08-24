<script>
    import ProposalCard from './proposal-card.svelte';
    export let proposals;
    export let categories;
    export let categoryColors;
    export let myRanking;
    export let shortlist;
    export let large = true;
</script>

<div class="card-row">
    {#each proposals as p}
        <ProposalCard class="prop" prop={p} {categories} {categoryColors} {large} {shortlist} bind:myRanking></ProposalCard>
    {/each}
</div>
