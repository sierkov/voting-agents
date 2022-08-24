<script context="module">
    export async function load({ session, props }) {
        if (session?.user) {
            return {
                status: 302,
                redirect: "/discover"
            }
        }
        return {
            props
        };
    }
</script>
<script>
    import Button from '@smui/button';
    let email, codeSent, sending, code, error;

    async function verifyEmail() {
        error = undefined;
        sending = true;
        const res = await fetch('/verify-email', { method: 'POST', body: JSON.stringify({ email }) });
        sending = false;
        if (res.ok) {
            codeSent = true;
        } else {
            error =  'We are sorry, but our mail server was not able to send you the secrect code. Likely, this is an internal issue. Please, try again later.';
        }
    }

    async function signIn() {
        error = undefined;
        const params = { email, code };
        const res = await fetch('/signin', { method: 'POST', body: JSON.stringify(params) });
        if (res.ok) {
            window.location.href = '/discover';
        } else {
            error =  'Authentication failed';
        }
    }
</script>

<div class="section login">
    <div class="container row">
        <div class="title">
            {#if codeSent}
                <h1>Enter the emailed secret</h1>
                <p>
                    We've just sent an email to <strong>{email}</strong> with your secret code.
                    <br>
                    Please, check your email and copy the one-time code into the field below.
                </p>
            {:else if sending}
                <h1>Wait, sending ...</h1>
                <p>Please, wait while were are communicating with our mail server.</p>
            {:else}
                <h1>What's your email?</h1>
                <p>We need an email to organize your votes.</p>
            {/if}
        </div>
        
        {#if error}
            <p class="error">{error}</p>
        {/if}

        {#if codeSent}
            <div class="input-area">
                <input placeholder="your secret code from the email" class="p" bind:value={code}>
                <Button variant="raised" class="cta" on:click={signIn}>Sign&nbsp;in</Button>
            </div>
        {:else if !sending}
            <div class="input-area">
                <input type="email" class="p email" placeholder="your-email@domain.com" bind:value={email}>
                <Button variant="raised" class="cta" on:click={verifyEmail}>Send secret</Button>
            </div>
        {/if}
    </div>
</div>

<style lang="scss">
    .section.login {
        background-color: #000063;
        color: #fff;
        .container {
            flex-direction: column;
            justify-content: center;
            text-align: center;
            height: calc(var(--vh, 1vh) * 100 - 50px);
            .title {
                h1 {
                    margin: 0;
                    padding: 0;
                    padding-bottom: 8px;
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
                    max-width: 300px;
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
                    border: 2px solid #512da8;
                    outline: none;
                }
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
</style>