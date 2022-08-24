<script>
    import { goto, afterNavigate } from '$app/navigation';
    import IconButton, { Icon } from '@smui/icon-button';
    import illustration from '../../../static/search.svg';;

	export let query;
    let staticExamples = [
        "farming", "NFTs", "AI",
        "oracles", "games", "africa",
        "climate", "identity", "wellbeing",
        "SDKs", "lobbying", "housing",
        "conferences", "training", "3D printing",
        "productivity"
    ];
    let examples;
    updateExamples();

    afterNavigate(() => updateExamples())

    function updateExamples() {
        examples = randomExamples(staticExamples);
    }

    function randomExamples(examples, n=3) {
        if (n > examples.length) n = examples.length;
        const source = Array.from(examples);
        const res = [];
        while (res.length < n) {
            const ri = Math.floor(Math.random() * source.length);
            res.push(...source.splice(ri, 1));
        }
        return res;
    }

    async function search() {
        await goto('/search?q=' + encodeURIComponent(query));
    }

    function checkEnter(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            search();
        }
    }
</script>

<div class="section">
    <div class="container">
        <h2 style="text-align: center">Find proposals matching your interests</h2>
        <div style="text-align: center" class="h3">
            <img src={illustration} alt="search illustration" style="height: 20vh">
        </div>
        <div class="search">
            <input bind:value={query} on:keypress={checkEnter} placeholder="explore proposals">
            <IconButton color="primary" class="search-btn" on:click={search}>
                <Icon class="material-icons">search</Icon>
            </IconButton>
        </div>
        <p>Examples: {examples.join(', ')}, &#8230;</p>
    </div>
</div>

<style lang="scss">
    .section {
        background-color: #000063;
        color: #fff;
        h2 {
            padding-top: 16px;
        }
    }
    .search {
        display: flex;
        margin-bottom: 16px;

        input {
            box-sizing: border-box;
            width: 100%;
            height: 46px;
            padding: 0 8px;
            border: 1px #ccc solid;
            border-radius: 8px 0 0 8px;
            background-color: #f0f0f0;
            font-size: 16px;
            line-height: 20px;

            @media (min-width: 576px) {
                padding: 0 12px;
            }
            @media (min-width: 992px) {
                padding: 0 16px;
            }
        }

        :global(.search-btn) {
            display: block;
            width: 48px;
            height: 46px;
            border: 1px;
            border-radius: 0 8px 8px 0;
            background-color: #FFEA00;

            :global(.material-icons) {
                margin-top: -4px;
                margin-left: -2px;
            }
        }
    }
</style>