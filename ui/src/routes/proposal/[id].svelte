<script context="module">
    export async function load({  session, props, params, url }) {
        if (!session?.user) {
            return {
                status: 302,
                redirect: "/"
            }
        }
        return {
            props: {
                ...props,
                id: params.id,
                url,
                user: session.user
            }
        };
    }
</script>

<script>
    import { onMount } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import Breadcrumbs from '$lib/component/breadcrumbs.svelte';
    import ProposalList from '$lib/component/proposal-list.svelte';
    import Footer from '$lib/component/footer.svelte';
    import ShortlistButton from '$lib/component/proposal/shortlist-button.svelte';
    import myRankingShared from '$lib/client/myranking';

    export let prop;
    export let categories;
    export let categoryColors;
    export let myRanking;
    export let similar;
    let error;

    function reportView() {
        fetch(`/proposal/${encodeURIComponent(prop.id)}/view`, { method: 'POST', body: JSON.stringify({}) });
    }

    afterNavigate(() => {
        reportView();
    })

    onMount(() => {
        reportView();
    });

    $: $myRankingShared = myRanking;
    $: myPos = $myRankingShared.indexOf(prop.id);
</script>

<Breadcrumbs path={[ { name: 'Proposal details', icon: 'list_alt' } ]}></Breadcrumbs>
<div class="section content">
    {#if error}
        <p class="error">{error}</p>
    {/if}
    <div class="row">
        <div class="proposal">
            <h1>{prop.title}</h1>
            <div class="categories">
                {#if myPos >= 0}
                    <div class="category my-ranking">
                        #{myPos + 1} of my ranking
                    </div>
                {/if}
                {#if prop.categories?.length}
                    {#each prop.categories as catId}
                        <div class="category {prop.categories?.includes(catId) ? 'pred' : ''}" style="background-color: {categoryColors[catId]};">
                            {categories[catId]}
                        </div>
                    {/each}
                {:else}
                    <div class="category" style="color: black; padding-left: 0; padding-right: 0">uncategorized</div>
                {/if}
            </div>
            <div class="actions">
                <ShortlistButton {prop} shortlist={true} bind:myRanking></ShortlistButton>
            </div>
            <div class="content">
                <p class="description">
                    {@html prop.html}
                </p>
            </div>
        </div>
        {#if similar.length > 0}
            <div class="similar">
                <h2>Similar proposals</h2>
                <ProposalList proposals={similar.slice(0, 3)} {categories} {categoryColors} {myRanking}></ProposalList>
            </div>
        {/if}
    </div>
</div>
<Breadcrumbs path={[ { name: 'Proposal details', icon: 'list_alt' } ]}></Breadcrumbs>
<Footer></Footer>

<style lang="scss">
    .content {
        .row {
            align-items: flex-start;
            flex-direction: column;
            @media (min-width: 992px) {
                flex-direction: row;
            }
            .similar {
                flex: 1 1 auto;
                @media (min-width: 992px) {
                    flex: 1 1 350px;
                }
                max-width: 100%;
                overflow: hidden;
            }
            .proposal {
                flex: 1 1 auto;
                @media (min-width: 992px) {
                    flex: 1 1 500px;
                }
                max-width: 100%;
                box-sizing: border-box;
                overflow-x: hidden;
                overflow-y: auto;
                background-color: #fff;
                padding: 16px;
                border-radius: 16px;
                @media (min-width: 576px) {
                    padding: 20px;
                    border-radius: 20px;
                }
                @media (min-width: 992px) {
                    padding: 24px;
                    border-radius: 24px;
                }
                h1 {
                    margin: 0;
                    overflow-wrap: break-word;
                }
                .description {
                    overflow-x: hidden;
                    overflow-wrap: break-word;
                }
                .categories {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 4px;
                    margin-bottom: 8px;
                    font-size: 16px;
                    line-height: 20px;
                    min-height: 20px;

                    .category {
                        font-size: 12px;
                        line-height: 16px;
                        font-weight: 400;
                        padding: 2px 4px;
                        text-transform: capitalize;
                        color: white;
                        border-radius: 4px;
                    }
                    .category.my-ranking {
                        background: black;
                    }
                }
                .actions {
                    margin-bottom: 32px;
                    display: flex;
                    flex-wrap: wrap;
                    gap: 8px;
                }
            }
        }
    }
</style>