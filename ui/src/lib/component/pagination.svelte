<script>
    import { createEventDispatcher } from 'svelte';
    import Button from '@smui/button';

    const dispatch = createEventDispatcher();

    //export let pageSizes = [10, 25, 50, 100];
    export let pageSize = 10;
    export let totalItems;
    export let page;

    function pageUpdate(event) {
        dispatch('update', event.detail);
    }

    function prev() {
        if (page  > 1) page--;
        pageUpdate({ detail: { page, pageSize } });
    }

    function next() {
        if (page < pageMax) page++;
        pageUpdate({ detail: { page, pageSize }})
    }

    $: pageMax = Math.ceil(totalItems / pageSize);
</script>

<div class="content">
    <Button variant="unelevated" color="secondary" disabled={page <= 1} on:click={prev}>Prev</Button>
    <p><strong>Page</strong>&nbsp;{page}&nbsp;of&nbsp;{pageMax}</p>
    <Button variant="unelevated" color="secondary" disabled={page >= pageMax} on:click={next}>Next</Button>    
</div>

<style>
    .content {
        padding: 2px 0px;
        display: flex;
        gap: 8px;
        justify-content: center;
        align-items: center;
    }
    p {
        margin: 0;
        line-height: 36px;
    }
</style>
