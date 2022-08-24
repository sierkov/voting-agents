<script context="module">
    export async function load({ session, props }) {
        if (session?.user) {
            return {
                status: 302,
                redirect: "/login"
            }
        }
        return {
            props
        };
    }
</script>
<script>
    import { Icon } from '@smui/common';
    import Button from '@smui/button';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    const slides = [
        {
            title: 'Find 3 Best Proposals',
            icon: 'find_in_page',
            text: 'Instead of reviewing all proposals find three proposals that are subjectively the best.'
        },
        {
            title: 'Use Proposal Discovery Tools',
            icon: 'construction',
            text: 'Semantic search, personalized recommendations, and similar proposals help find relevant proposals.'
        },
        {
            title: 'Shortlist What You Like',
            icon: 'favorite',
            text: 'Browse through proposals and shortlist what attracts your attentions for a later review.'
        },
        {
            title: 'Submit Your Vote',
            icon: 'send',
            text: 'In the short list, move best proposals to the top; the three top proposals are your vote.'
        },
        {
            title: 'Time to try yourself!',
            icon: 'login',
            text: 'Select 3 subjectively best proposals out of thousands Cardano Catalyst ones within 15 minutes.'
        }
    ];
    let renav = false;

    async function renavigate(slideIdx) {
        let urlNew = $page?.url?.pathname;
        const params = new URLSearchParams();
        if (slideIdx !== 0) params.append('slide', slideIdx);
        if (params.toString().length) urlNew += '?' + params.toString();
        if (params.toString() !== $page?.url?.searchParams?.toString() && !renav) {
            renav = true;
            await goto(urlNew);
            renav = false;
        }
    }

    async function login() {
        await goto('/login');
    }

    async function nextSlide(slideIdx) {
        if (slideIdx + 1 < slides.length) {
            await renavigate(slideIdx + 1);
        } else {
            await login();
        }
    }

    $: slideIdx = parseInt($page?.url?.searchParams?.get('slide')) || 0;
    $: progress = slideIdx / slides.length;
    $: slide = slides[slideIdx];
</script>

<div class="section intro">
    <div class="container row slide">
        <div>
            <Icon class="material-icons">{slide?.icon}</Icon>
        </div>
        <div class="title">
            <h1>{slide?.title}</h1>
            <p class="note">{slide?.text}</p>
        </div>
        <div style="margin-bottom: 16px; display: flex; gap: 8px; justify-content: center">
            <Button variant="raised" class="action primary" on:click={() => nextSlide(slideIdx)}>Continue</Button>
            {#if slideIdx === 0}
                <Button class="action secondary" on:click={login}>Skip Intro</Button>
            {/if}
        </div>
        <div class="progress row">
            {#each slides as s, idx}
                <div class="slide-marker" class:selected={slideIdx === idx}></div>
            {/each}
        </div>
        <!--<p style="color: #ccc">Slide {slideIdx + 1} of {slides.length}</p>-->
    </div>
</div>

<style lang="scss">
    .section.intro {
        background-color: #000063;
        color: #fff;
        .container.slide {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: center;
            //gap: 64px;
            height: calc(var(--vh, 1vh) * 100);
            :global(.material-icons) {
                font-size: 100px;
                color: #08ADF7;
            }
            .title {
                margin-bottom: 16px;
                h1 {
                    margin: 0;
                    margin-bottom: 8px;
                }
                .note {
                    margin: 0;
                    margin-bottom: 8px;
                }
            }
            :global(.action) {
                height: 50px;
                padding: 0 16px;
                font-size: 14px;
                line-height: 20px;
                font-weight: 700;
                letter-spacing: 0.03em;
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
            :global(.action.primary) {
                background-color: #FFEB3B !important;
                color: #000063 !important;
            }
            :global(.action.secondary) {
                color: #FFEB3B !important;
                background-color: #000063 !important;
                border: 1px #FFEB3B solid;
                font-weight: 400;
                padding: 0 8px;
                @media (min-width: 576px) {
                    padding: 0 12px;
                }
                @media (min-width: 992px) {
                    padding: 0 16px;
                }
            }
            .progress {
                .slide-marker {
                    width: 8px;
                    height: 8px;
                    border: 1px #f0f0f0 solid;
                    border-radius: 4px;
                }
                .slide-marker.selected {
                    background-color: #f0f0f0;
                }
            }
        }
    }
</style>