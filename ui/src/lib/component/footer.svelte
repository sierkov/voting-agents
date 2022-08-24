<script>
    import { Icon } from '@smui/common';
    import githubMark from '../../../static/github-mark.svg';
    import logo from '../../../static/logo.svg';
</script>

<div class="section footer">
    <div class="container">
        <div style="margin-bottom: 32px">
            <img src={logo} alt="voting agents logo" class="logo">
        </div>
        <div class="row links">
            <div class="column">
                <h4>Contact us</h4>
                <div class="row">
                    <Icon class="material-icons">mail</Icon>
                    <p>
                        info@votingagents.org
                    </p>
                </div>
                <div class="row">
                    <div style="margin-right: 8px">
                        <img src={githubMark} alt="GitHub logo" width="32" height="32">
                    </div>
                    <p>
                       <a target="_blank" href="https://github.com/sierkov/voting-agents">Github repository</a>
                    </p>
                </div>
            </div>
            <div class="column" style="align-self: flex-start">
                <h4>Legal information</h4>
                <div class="row">
                    <Icon class="material-icons">policy</Icon>
                    <p>
                        Privacy policy and GDPR compliance
                    </p>
                </div>
                <div class="row">
                    <Icon class="material-icons">contact_mail</Icon>
                    <p>
                        Imprint
                    </p>
                </div>
            </div>
        </div>
        <div class="copyright">
            <p>
                Copyright © 2022, <a href="/">votingagents.org</a>
            </p>
        </div>
    </div>
</div>

<style lang="scss">
    .section.footer {
        color: #ede7f6;
        background-color: #000063;
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

        a, a:focus, a:visited, a:active {
            color: #ede7f6;
            text-decoration: none;
        }
        .row {
            display: flex;
            align-items: center;
            flex-wrap: nowrap;
            margin-bottom: 16px;
            p {
                margin: 0;
            }
        }
        .row.links {
            flex-wrap: wrap;
            > * {
                flex: 1 1 1px;
                min-width: 240px;
            }
        }
        .copyright {
            text-align: left;
        }
        .links {
            gap: 16px;
            @media (min-width: 576px) {
                gap: 32px;
            }
            @media (min-width: 992px) {
                gap: 64px;
            }
        }
        :global(.material-icons) {
            font-size: 32px;
            margin: 0;
            padding-right: 8px;
            color: #fff;
        }
    }
    .logo {
        height: 28px;
        @media (min-width: 576px) {
            height: 32px;
        }
        @media (min-width: 992px) {
            height: 40px;
        }
    }
</style>