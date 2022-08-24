<script>
    import Breadcrumbs from '$lib/component/breadcrumbs.svelte';
    import ProposalCard from '$lib/component/proposal-card.svelte';
    import Footer from '$lib/component/footer.svelte';

    export let categories;
    export let categoryColors;
    export let leaderboard;
    let breadcrumbsPath = [ { name: 'Leaderboard', icon: 'leaderboard' } ];
</script>

<Breadcrumbs path={breadcrumbsPath}></Breadcrumbs>
<div class="section">
    <div class="container">
        <h1>Proposal Leaderboard</h1>
        <div class="card-row">
            {#each leaderboard as prop}
                <ProposalCard {prop} {categories} {categoryColors} large={false} shortlist={'none'} noBounds={true} adaBalance={prop?.adaBalance} myRanking={leaderboard.map(p => p.id)}></ProposalCard>
            {/each}
        </div>
    </div>
</div>
<Breadcrumbs path={breadcrumbsPath}></Breadcrumbs>
<Footer></Footer>

<style lang="scss">
    .section {
        padding-top: 0;
    }
    .card-row {
        flex-direction: column;
    }

</style>
