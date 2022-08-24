<script>
    import { onMount } from 'svelte';
    import Button from '@smui/button';
    import { Icon } from '@smui/common';
    import myRankingShared from '$lib/client/myranking';
    import ShortlistButton from '$lib/component/proposal/shortlist-button.svelte';
    import { votingPower } from '$lib/constants';

    export let prop;
    export let categories;
    export let categoryColors;
    export let myRanking = [];
    export let large = false;
    export let shortlist = true;
    export let noBounds = false;
    export let adaBalance = undefined;
    let observer, container;
    let visible, visibleStartTime, visibleTimeoutId, visibleReported;

    function reportVisibility(endTime = performance.now()) {
        const duration = (endTime - visibleStartTime) / 1000;
        if (visible && duration >= 1.0) {
            fetch(`/proposal/${encodeURIComponent(prop.id)}/view-card`, { method: 'POST', body: JSON.stringify({}) });
            visibleReported = true;
        }
    }

    function onViewportChange(entries) {
        for (const entry of entries) {
            if (entry.isIntersecting) {
                visible = true;
                visibleStartTime = entry.time;
                visibleTimeoutId = setTimeout(() => {
                    visibleTimeoutId = undefined;
                    reportVisibility();
                }, 1000);
            } else {
                if (visibleTimeoutId) clearTimeout(visibleTimeoutId);
                if (!visibleReported) reportVisibility(entry.time);
                visible = false;
                visibleStartTime = undefined;
            }
        }
    }

    onMount(() => {
        observer = new IntersectionObserver(onViewportChange, { threshold: [0.5] });
        observer.observe(container);
        return () => observer.unobserve(container);
    });

    $: myPos = myRanking.indexOf(prop.id);
    $: $myRankingShared = myRanking;
</script>

<div class="card proposal" class:ranked={myPos >= 0} class:large={large} class:no-bounds={noBounds} bind:this={container}>
    <div class="categories tooltip">
        <div class="categories-normal">
            {#if myPos >= 0}
                <div class="category my-ranking">
                    <Icon class="material-icons">favorite</Icon><span style="vertical-align: baseline">#{myPos + 1}</span>
                </div>
            {/if}
            {#if prop.categories.length}
                {#each prop.categories as catId}
                    <div class="category {prop.categories?.includes(catId)? 'pred' : ''}" title={categories[catId]} style="background-color: {categoryColors[catId]}">
                        {categories[catId][0]}
                    </div>
                {/each}
            {:else}
                <div class="category" style="color: black; padding: 0">uncategorized</div>
            {/if}
        </div>
        <div class="categories-special">
            {#if myPos >= 0 && myPos < 3}
                <div class="category my-ranking">
                    {#if adaBalance !== undefined}
                        {#if myPos < votingPower.length }
                            {Math.round(adaBalance * votingPower[myPos] * 10) / 10} ADA
                        {/if}
                    {:else}
                        {#if myPos < votingPower.length }
                            {100 * votingPower[myPos]}% voting power
                        {/if}
                    {/if}
                </div>
            {/if}
        </div>
    </div>
    <h3 class="title">
        <a href={'/proposal/' + encodeURIComponent(prop.id)}>{prop.title}</a>
    </h3>
    <p class="description">
        {prop.description}
    </p>
    <div class="actions">
        {#if shortlist !== 'none'}
            <div style="margin-right: 8px">
                <ShortlistButton {prop} {shortlist} bind:myRanking></ShortlistButton>
            </div>
        {/if}
        <div class="details-btn">
            <Button href={'/proposal/' + encodeURIComponent(prop.id)}>
                details
                <Icon class="material-icons">arrow_forward</Icon>
            </Button>
        </div>
    </div>
</div>

<style lang="scss">
    .proposal {
        align-self: flex-start;
        text-align: left;
        .title {
            margin: 0;
            margin-bottom: 8px;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: wrap;
            height: calc(2 * 28px);
            @media (min-width: 576px) {
                margin-bottom: 12px;
                height: calc(2 * 32px);
            }
            @media (min-width: 992px) {
                margin-bottom: 16px;
                height: calc(2 * 40px);
            }
            a {
                display: block;
                height: 100%;
                white-space: normal;
            }
        }
        .categories {
            display: flex;
            align-items: flex-start;
            flex-wrap: wrap;
            gap: 4px;
            min-height: 20px;
            margin: 4px 0px;
            margin-bottom: 8px;
            font-weight: 700;
            @media (min-width: 576px) {
                margin-bottom: 12px;
            }
            @media (min-width: 992px) {
                margin-bottom: 16px;
            }
            .categories-normal {
                flex: 1 1 1px;
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                gap: 4px;
            }
            .categories-special {
                flex-grow: 0;
                flex-shrink: 0;
                white-space: nowrap;
            }
            .category {
                padding: 2px 6px;
                border-radius: 4px;
                border-radius: 2px;
                color: #fff;
                text-transform: capitalize;
            }
            .category.my-ranking {
                background: #FFEA00;
                color: #000063;
                text-transform: none;
            }
            :global(.material-icons) {
                position: relative;
                top: 1px;
                vertical-align: baseline;
                font-size: 12px;
                @media (min-width: 576px) {
                    top: 1px;
                    font-size: 14px;
                }
                @media (min-width: 992px) {
                    top: 2px;
                    font-size: 16px;
                }
            }
        }
        .description {
            display: -webkit-box;
            margin: 16px 0;
            margin-top: 0;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            white-space: wrap;
            height: calc(2 * 20px);
            @media (min-width: 576px) {
                margin-bottom: 24px;
            }
            @media (min-width: 992px) {
                margin-bottom: 32px;
                height: calc(2 * 28px);
            }
        }
        .actions {
            display: flex;
            overflow: visible;
            white-space: nowrap;
            .details-btn {
                border: 1px #5E35B1 solid;
                border-radius: 4px;
                color: #5E35B1;
                :global(.material-icons) {
                    margin-right: 0;
                    margin-left: 4px;
                    color: #5E35B1;
                }
            }
            :global(.material-icons) {
                position: relative;
                top: -1px;
                margin-top: -1px;
            }
        }
    }
    .proposal.card.no-bounds {
        box-sizing: border-box;
        min-width: unset;
        max-width: unset;
        width: 100%;
    }
    .large {
        .title {
            -webkit-line-clamp: 2;
            height: calc(2 * 28px);
            @media (min-width: 576px) {
                margin-bottom: 12px;
                height: calc(2 * 32px);
            }
            @media (min-width: 992px) {
                margin-bottom: 16px;
                height: calc(2 * 40px);
            }
        }
        .description {
            display: -webkit-box;
            -webkit-line-clamp: 6;
            height: calc(6 * 20px);
            @media (min-width: 992px) {
                margin-bottom: 32px;
                height: calc(6 * 28px);
            }
        }
    }
</style>