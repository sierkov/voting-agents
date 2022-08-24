<script>
    import Button from '@smui/button';
    import ProposalCard from '$lib/component/proposal-card.svelte';
    import myRankingShared from '$lib/client/myranking';

    export let myVote;
    export let myRanking;
    export let myBalance;
    export let proposals;
    export let categories;
    export let categoryColors;
    let error, inProgress, done;

    async function submit() {
        error = undefined;
        inProgress = true;
        const res = await fetch('/vote/submit/save', { method: 'POST', body: JSON.stringify({ vote: myVote, balance: myBalance }) });
        error =  'We are sorry, but our server was not able to record the vote. This is likely an internal error. Please, try again later';
        if (res.ok) {
            const json = await res.json();
            error = json?.error;
            if (!error) done = true;
        }
        if (!error) inProgress = false;
    }

    $: $myRankingShared = myRanking;
</script>

<div class="section submit">
    <div class="container row">
        {#if done}
            <div class="title">
                <h1>Your vote is recorded!</h1>
                <p>Thank you. You can view the in-progress leaderboard now.</p>
            </div>
        {:else if inProgress}
            <div class="title">
                <h1>Wait, submitting ...</h1>
                <p>Please, wait while we are sending your vote to our servers.</p>
            </div>
        {:else}
            <div class="title">
                <h1>Confirm your vote</h1>
                <p>
                    The three proposals below will be recorded as your final vote.
                    <br>
                    Review them and press "Submit" if everything is all right.
                    The submission is irreversible.
                </p>
            </div>
        {/if}

        {#if error}
            <p class="error">{error}</p>
        {:else if !done && !inProgress}
            {#each proposals as prop}
                <ProposalCard {prop} {categories} {categoryColors} large={false} shortlist={'none'} noBounds={true} adaBalance={myBalance?.adaBalance} bind:myRanking></ProposalCard>
            {/each}
        {/if}

        {#if done}
            <div class="actions row">
                <Button variant="raised" class="action primary" href="/leaderboard">View Leaderboard</Button>
            </div>
        {:else if !inProgress}
            <div class="actions row">
                <Button variant="raised" class="action primary" on:click={submit}>submit vote</Button>
                <Button class="action secondary" href="/favorite">cancel</Button>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .section.submit {
        background-color: #000063;
        color: #fff;
        .container {
            min-height: calc(var(--vh, 1vh) * 100);
            flex-direction: column;
            justify-content: center;
            text-align: center;
            box-sizing: border-box;
            //height: calc(var(--vh, 1vh) * 100);
            .title {
                h1 {
                    margin-bottom: 8px;
                }
            }
            .error {
                padding: 8px;
                font-weight: 700;
                margin-bottom: 16px;
            }
            .error {
                background: red;
                color: white;
                border-radius: 4px;
            }
            .actions {
                gap: 8px;
            }
        }
    }
</style>