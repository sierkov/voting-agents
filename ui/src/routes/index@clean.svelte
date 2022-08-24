<script>
    import Button from '@smui/button';
    import Footer from '$lib/component/footer.svelte';
    import { Icon } from '@smui/common';
    import illustration from '../../static/connected-world-inverted-colored.svg';
    import community from '../../static/community.svg';
    import curious from '../../static/action.svg';
    import logo from '../../static/logo.svg';
    import iconTime from '../../static/icon-time.svg';
    import iconBias from '../../static/icon-bias.svg';
    import iconAuditable from '../../static/icon-auditable.svg';
</script>

<div class="section title">
    <div class="container">
        <div class="logo">
            <img src={logo} alt="voting agents logo">
        </div>
        <div class="row about">
            <div class="motto">
                <h2>Astonishingly-Quick Community-Driven Proposal&nbsp;Funding</h2>
                <p>Empowers voters to choose from thousands of proposals in minutes.</p>
                <Button class="cta" variant="raised" color="primary" href="/intro">Experience myself</Button>
            </div>
            <div class="motto-image">
                <img src={illustration} alt="connected world" class="illustration">
            </div>
        </div>
        <div class="mouse"></div>
    </div>
</div>

<div class="section info">
    <div class="container">
        <h2>Community voting that scales to thousands of proposals</h2>
        <div class="card-row value-prop">
            <div class="card aspect one">
                <img src={iconTime} alt="time" class="icon h3">
                <h3>Just 15 mins per voter</h3>
                <p>Carefully use the time of your community</p>
            </div>
            <div class="card aspect two">
                <img src={iconAuditable} alt="auditable" class="icon h3">
                <h3>Auditable and transparent</h3>
                <p>Everyone can see how each vote influences the final outcome</p>
            </div>
            <div class="card aspect three">
                <img src={iconBias} alt="bias" class="icon h3">
                <h3>No bias of intermediaries</h3>
                <p>Results directly represent the opinions of your community</p>
            </div>
        </div>
    </div>
</div>

<div class="section info white">
    <div class="container">
        <h2>What it can do for your community?</h2>
        <div class="row illustrated">
            <div>
                <img src={community} alt="community" class="illustration-small">
            </div>
            <div>
                <div class="benefit-list">
                    <div class="benefit">
                        <Icon class="material-icons h3">check</Icon>
                        <p>Make funding decisions weekly</p>
                    </div>
                    <div class="benefit">
                        <Icon class="material-icons h3">check</Icon>
                        <p>Consider thousands of proposals each cycle</p>
                    </div>
                    <div class="benefit">
                        <Icon class="material-icons h3">check</Icon>
                        <p>Develop deeper insights about your community</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="section info">
    <div class="container">
        <h2>Curious to see Voting Agents in action?</h2>
        <div class="row" style="flex-direction: column">
            <div style="flex: 1 1; text-align: center">
                <img src={curious} alt="curious" class="illustration-small">
            </div>
            <div style="text-align: center">
                <Button class="cta" variant="raised" color="primary" href="/intro">Experience myself</Button>
            </div>
        </div>
    </div>
</div>

<Footer></Footer>

<style lang="scss">
    .row.illustrated {
        flex-direction: column;
        justify-content: space-evenly;
        @media (min-width: 992px) {
            flex-direction: row;
        }
    }
    .logo {
        text-align: center;
        padding-bottom: 12px;
        @media (min-width: 576px) {
            padding-bottom: 16px;
        }
        @media (min-width: 992px) {
            text-align: left;
            padding-bottom: 24px;
        }
        img {
            height: 28px;
            @media (min-width: 576px) {
                height: 32px;
            }
            @media (min-width: 992px) {
                height: 40px;
            }
        }
    }
    .white {
        background-color: #fff;
    }
    :global(.cta) {
        padding: 16px;
        margin: 0;
        font-size: 14px;
        line-height: 20px;
        font-weight: 700;
        letter-spacing: 0.03em;
        background-color: #FFEB3B !important;
        color: #000063 !important;
        @media (min-width: 576px) {
            font-size: 16px;
            padding: 24px;
        }
        @media (min-width: 992px) {
            font-size: 20px;
            line-height: 24px;
            padding: 32px;
        }
    }
    .value-prop {
        > * {
            text-align: center;
        }
    }
    .card {
        flex-basis: 250px;
        min-width: min-content;
        max-width: none;
        :global(.material-icons) {
            font-size: 64px;
            line-height: 64px;
        }
        h3 {
            margin-top: 0px;
        }
        p {
            margin-bottom: 0px;
        }
        > * {
            width: 100%;
        }
    }
    .aspect {
        background-color: #fff;
        padding: 24px;
        gap: 24px;
        //border: #e0e0e0 2px solid;
        border-radius: 24px;
        //box-shadow: 4px 4px rgba(0, 0, 0, 25%);
        h3, .h3 {
            margin: 0;
        }
   }
    .icon {
        width: 100px;
        height: 100px;
    }
    .section.title {
        color: #fff;
        background: #000063;
        box-sizing: border-box;
        height: calc(100vh);
        vertical-align: middle;
        display: flex;
        align-items: center;

        .about {
            flex-direction: column-reverse;
            @media (min-width: 992px) {
                flex-direction: row;
            }
            .motto {
                flex: 1 1 2px;
                text-align: center;
                @media (min-width: 992px) {
                    text-align: left;
                }
                p {
                    margin-bottom: 16px;
                    @media (min-width: 576px) {
                        margin-bottom: 24px;
                    }
                    @media (min-width: 992px) {
                        margin-bottom: 32px;
                    }
                }
            }
            .motto-image {
                max-width: calc(60vw);
                display: block;
                flex: 1 1 4px;
                align-self: center;
                @media (min-width: 992px) {
                    align-self: flex-start;
                }
            }
        }
    }
    .illustration {
        height: auto;
        width: 100%;
        max-height: calc(15vh);
        @media (min-width: 576px) {
            max-height: calc(20vh)
        }
        @media (min-width: 992px) {
            max-height: calc(50vh)
        }
    }
    .illustration-small {
        width: 100%;
        height: auto;
        display: inline-block;
        margin: 0;
        max-width: 128px;
        @media (min-width: 576px) {
            max-width: 196px;
        }
        @media (min-width: 992px) {
            max-width: 256px;
        }
    }
    .section.info {
        padding-top: 64px;
        padding-bottom: 64px;
        @media (min-width: 576px) {
            padding-top: 96px;
            padding-bottom: 96px;
        }
        @media (min-width: 992px) {
            padding-top: 128px;
            padding-bottom: 128px;
        }
        h2 {
            text-align: center;
        }
    }
    .benefit-list {
        margin: 0;
        display: inline-block;

        .benefit {
            display: flex;
            gap: 8px;
            margin-bottom: 8px;
            justify-content: flex-start;
            align-items: center;
            p {
                flex: 1 1;
                margin: 0;
                text-align: left;
            }
            :global(.material-icons) {
                flex: 0 0;
                margin: 0;
                color: #85BF40;
            }
        }
    }
    .mouse {
        width: 26px;
        height: 42px;
        border: 2px solid #fff;
        border-radius: 24px;
        position: absolute;
        left: 50%;
        transform: translate(-50%, -50%);
        bottom: -16px;
        @media (min-width: 576px) {
            bottom: -8px;
        }
        @media (min-width: 992px) {
            bottom: 0;
        }
    }
    .mouse:after {
        content: "";
        position: absolute;
        top: 5px;
        left: 50%;
        margin-left: -2px;
        background-color: #fff;
        border-radius: 100%;
        width: 4px;
        height: 4px;
        opacity: 1;
        -webkit-transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
        transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
        -webkit-animation: scroll 1.5s -1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        animation: scroll 1.5s -1s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
    }
    @-webkit-keyframes scroll {
        0%, 20% {
            -webkit-transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
            transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
        }
        10% {
            -webkit-transform: translateY(0px) scaleY(1.2) scaleX(1.2) translateZ(0px);
            transform: translateY(0px) scaleY(1.2) scaleX(1.2) translateZ(0px);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(20px) scaleY(2.5) scaleX(0.5) translateZ(0px);
            transform: translateY(20px) scaleY(2.5) scaleX(0.5) translateZ(0px);
            opacity: 0.01;
        }
    }
    @keyframes scroll {
        0%, 20% {
            -webkit-transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
            transform: translateY(0px) scaleY(1) scaleX(1) translateZ(0px);
        }
        10% {
            -webkit-transform: translateY(0px) scaleY(1.2) scaleX(1.2) translateZ(0px);
            transform: translateY(0px) scaleY(1.2) scaleX(1.2) translateZ(0px);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(20px) scaleY(2.5) scaleX(0.5) translateZ(0px);
            transform: translateY(20px) scaleY(2.5) scaleX(0.5) translateZ(0px);
            opacity: 0.01;
        }
    }
</style>
