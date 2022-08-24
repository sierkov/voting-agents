<script>
    import Button from '@smui/button';
    let addr, balance, error;
    let checking = false;

    async function connectAddr() {
        error = undefined;
        checking = true;
        const res = await fetch('/wallet/connect', { method: 'POST', body: JSON.stringify({ addr }) });
        console.log('res.ok:', res);
        checking = false;
        if (res.ok) {
            const json = await res.json();
            console.log('res.json:', json);
            balance = json?.adaBalance;
            error = json?.error;
        } else {
            error =  'We are sorry, but our server was not able to access blockchain data. Please, check the correctness of the address and try again. It should be a Shelley address starting with addr1';
        }
    }
</script>

<div class="section wallet">
    <div class="container row">
        <div class="title">
            {#if balance !== undefined}
                <h1>Your voting power is {balance} ADA!</h1>
                <p>Thank you for connecting your wallet. Now, you can submit your vote.</p>
            {:else if checking}
                <h1>Wait, fetching blockhain data ...</h1>
                <p>Please, wait while were are communicating with our blockchain server.</p>
            {:else}
                <h1>What's your ADA address?</h1>
                <p>Your Cardano address is needed to determine your voting power and receive voting rewards.</p>
            {/if}
        </div>
        
        {#if error}
            <p class="error">{error}</p>
        {/if}

        {#if balance !== undefined}
            <div class="input-area">
                <Button variant="raised" class="cta" href="/submit">Submit vote</Button>
            </div>
        {:else if !checking}
            <div class="input-area">
                <input class="p" placeholder="addr1ABCDEFG" bind:value={addr}>
                <Button variant="raised" class="cta" on:click={connectAddr}>connect</Button>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .section.wallet {
        padding-top: 0;
        padding-bottom: 0;
        background-color: #000063;
        color: #fff;
        .container {
            flex-direction: column;
            justify-content: center;
            text-align: center;
            box-sizing: border-box;
            height: calc(var(--vh, 1vh) * 100);
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
            .input-area {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 8px;

                input {
                    box-sizing: border-box;
                    height: 50px;
                    width: 100%;
                    border: 1px solid #512da8;
                    border-radius: 4px;
                    padding: 0px 8px;
                    margin: 0;
                    color: #000063;
                }
                input::placeholder {
                    color: #b39ddb;
                }
                input:focus, input:active {
                    border: 2px solid #FFEB3B;
                    outline: none;
                }
                :global(.cta) {
                    height: 50px;
                    padding: 0 16px;
                    font-size: 14px;
                    line-height: 20px;
                    font-weight: 700;
                    letter-spacing: 0.03em;
                    background-color: #FFEB3B !important;
                    color: #000063 !important;
                    @media (min-width: 576px) {
                        font-size: 16px;
                        padding: 0 24px;
                    }
                    @media (min-width: 992px) {
                        font-size: 20px;
                        line-height: 24px;
                        padding: 0 32px;
                    }
                }
            }
        }
    }
</style>
