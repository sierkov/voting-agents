<script>
    import { onMount, tick } from 'svelte';
    import { afterNavigate } from '$app/navigation';
    import { Icon } from '@smui/common';

    export let catId;
    export let categoriesExt;
    let listElement;
    let categoryElements = {};

    function sortCategories(categoriesExt) {
        const copy = Array.from(Object.entries(categoriesExt));
        copy.sort((a, b) => a[1].name.localeCompare(b[1].name));
        return copy;
    }

    async function rescroll() {
        await tick();
        const childElement = categoryElements[catId];
        if (listElement && childElement) {
            listElement.scrollLeft = childElement.offsetLeft - listElement.getBoundingClientRect().left;
        }
    }

    async function setCatId(newCatId) {
        catId = newCatId;
    }

    onMount(rescroll);
    afterNavigate(rescroll);

    $: sortedCategories = sortCategories(categoriesExt);
</script>

<div class="category-list" bind:this={listElement}>
    {#each sortedCategories as [iCatId, catMeta]}
        <div class="category" bind:this={categoryElements[iCatId]} style="color: {catId === iCatId ? catMeta?.color : '#d3d3d3'}" on:click={() => setCatId(iCatId)}>
            <Icon class="material-icons">{catMeta?.icon}</Icon>
            <h4>{catMeta?.name}</h4>
        </div>
    {/each}
</div>

<style lang="scss">
    .category-list {
        display: flex;
        overflow-x: auto;
        overflow-y: hidden;
        gap: 16px;
        .category {
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 8px;
            h4 {
                white-space: nowrap;
            }
            :global(.material-icons) {
                font-size: 64px;
                line-height: 64px;
                color: inherit;
            }
        }
    }
</style>