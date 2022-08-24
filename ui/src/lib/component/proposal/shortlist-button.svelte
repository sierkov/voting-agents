<script>
    import Button from '@smui/button';
    import Menu from '@smui/menu';
    import List, { Item, Text } from '@smui/list';
    import { Icon } from '@smui/common';
    import { Ranking } from '$lib/client/ranking';
    import myRankingShared from '$lib/client/myranking';

    export let prop;
    export let shortlist = true;
    export let myRanking;
    let menu;

    async function updateRanking(newIdx) {
        myRanking = await Ranking.default().update(prop.id, newIdx, fetch);
    }

    $: myPos = myRanking.indexOf(prop.id);
    $: myRankingShared$ = myRanking;
</script>

{#if shortlist}
    {#if myPos < 0}
        <Button color="primary" variant="unelevated" on:click={() => updateRanking(myRanking.length)}>
            <div class="rank-btn">
                <Icon class="material-icons">favorite</Icon>
                shortlist
            </div>
        </Button>
    {:else}
        <Button color="primary" variant="unelevated" on:click={() => updateRanking(-1)}>
            <div class="rank-btn">
                <Icon class="material-icons">favorite</Icon>
                unshortlist
            </div>
        </Button>
    {/if}
{:else}
    <Button color="primary" variant="unelevated" on:click={() => menu.setOpen(true)}>
        <div class="rank-btn">
            <Icon class="material-icons">move_up</Icon>
            rerank
        </div>
    </Button>
    <Menu bind:this={menu} style="top: -140px">
        <List>
            {#if myPos !== 0}
                <Item on:SMUI:action={() => updateRanking(0)}>
                    <Text>Make my #1</Text>
                </Item>
            {/if}
            {#if myPos !== 1}
                <Item on:SMUI:action={() => updateRanking(1)}>
                    <Text>Make my #2</Text>
                </Item>
            {/if}
            {#if myPos !== 2}
                <Item on:SMUI:action={() => updateRanking(2)}>
                    <Text>Make my #3</Text>
                </Item>
            {/if}
            {#if myPos > 0}
                <Item on:SMUI:action={() => updateRanking(myPos - 1)}>
                    <Text>Move up</Text>
                </Item>
            {/if}
            {#if myPos >= 0}
                <Item on:SMUI:action={() => updateRanking(-1)}>
                    <Text>Drop from my shortlist</Text>
                </Item>
            {/if}
        </List>
    </Menu>
{/if}

<style lang="scss">
    .rank-btn {
        color: #fff;
        :global(.material-icons) {
            margin-right: 0;
            color: #fff;
        }
    }
</style>
