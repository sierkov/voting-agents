<script>
    import { Icon } from '@smui/common';

    export let path;
    export let rnd;

    $: fullPath = [ { name: 'Home', icon: 'home', url: '/discover' + (rnd ? '?rnd=' + encodeURIComponent(rnd) : '') }, ...path]
</script>

<div class="section breadcrumbs">
    {#each fullPath as p, i}
        {#if p.url}
            <a class="path" href={p.url}>
                {#if p.icon}
                    <div class="icon">
                        <Icon class="material-icons">{p.icon}</Icon>
                    </div>
                {/if}
                <p>
                    {p.name}
                </p>
            </a>
        {:else}
            <span class="path">
                {#if p.icon}
                    <div class="icon">
                        <Icon class="material-icons">{p.icon}</Icon>
                    </div>
                {/if}
                <p>
                    {p.name}
                </p>
            </span>
        {/if}
        {#if i < fullPath.length - 1}
            <span class="path">
                <div class="icon">
                    <Icon class="material-icons">chevron_right</Icon>
                </div>
            </span>
        {/if}
    {/each}
</div>

<style lang="scss">
    .section.breadcrumbs {
        //background-color: #fff;
        padding-top: 2px;
        padding-bottom: 2px;
        @media (min-width: 576px) {
            padding-top: 4px;
            padding-bottom: 4px;
        }
        @media (min-width: 992px) {
            padding-top: 8px;
            padding-bottom: 8px;
        }
        p {

        }
        a, a:active, a:focus, a:visited {
            text-decoration: none;
            font-weight: 700;
            color: #000063;
        }
    }
    .path {
        margin: 8px 0px;
        display: inline-flex;
        align-items: center;
        .icon {
            display: inline-block;
            margin-right: 4px;
            :global(.material-icons) {
                font-size: 16px;
                line-height: 20px;
                @media (min-width: 992px) {
                    font-size: 20px;
                    line-height: 28px;
                }
            }
        }
        p {
            margin: 0;
        }
    }
    
</style>
