<script>
	import '../app.scss';
	import { navigating, page, session } from '$app/stores';
	import Button from '@smui/button';
	import Menu from '@smui/menu';
	import IconButton, { Icon } from '@smui/icon-button';
	import myRanking from '$lib/client/myranking';
	import logo from '../../static/logo-light.svg';
	import logoSmall from '../../static/logo-small-light.svg';
	let userMenu;

	async function signOut() {
        const res = await fetch('/signout', { method: 'POST', body: '{}' });
        if (!res.ok) console.error(await res.text());
        window.location.href = '/';
    }

	$: rnd = $page.url.searchParams.get('rnd');
	$: discoverUrl = '/discover' + (rnd ? '?rnd=' + encodeURIComponent(rnd) : '');
	$: signedIn = $session?.user?.email;
	$: myRankingCount = $myRanking.length;
</script>

<svelte:head>
	<link rel="icon" type="image/svg" href="/favicon.png" />
</svelte:head>

<div class="drawer-container">
	<div class="navbar">
		<h2 class="full"><a style="display: inline-block; margin-top: 8px" href={discoverUrl}><img src={logo} height="40px" alt="Voting Agents logo"></a></h2>
		<h2 class="small"><a style="display: inline-block; margin-top: 8px" href={discoverUrl}><img src={logoSmall} height="40px" alt="Voting Agents logo"></a></h2>
		{#if signedIn} 
			<div class="personal-section">
				<IconButton href="/favorite">
					<div class="badge-container">
						<Icon class="material-icons">favorite</Icon>
						<span class="badge">{myRankingCount}</span>
					</div>
				</IconButton>
				<IconButton on:click={() => userMenu.setOpen(true)}>
					<Icon class="material-icons">account_circle</Icon>
				</IconButton>
				<Menu bind:this={userMenu}>
					<div class="personal-menu">
						<div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px">
							<div style="margin-left: 4px">
								<Icon class="material-icons">account_circle</Icon>
							</div>
							<div><strong>{signedIn}</strong></div>
						</div>
						<Button on:click={signOut}><Icon class="material-icons">logout</Icon>Sign out</Button>
					</div>
				</Menu>
			</div>
		{/if}
	</div>
	<main class="main-content">
		<div class="navbar-filler"></div>
		{#if $navigating}
			<div class="page">
				<p style="padding: 16px;">Please, wait for a second while we are navigating you to the next page: {$navigating.to} ...</p>	
			</div>
		{/if}
		<div class:hidden={$navigating}>
			<slot />
		</div>
	</main>
</div>

<style lang="scss">
	.hidden {
		display: none;
	}
	* :global(.app-content) {
		flex: auto;
		position: relative;
		flex-grow: 1;
	}

	.badge-container {
		position: relative;
		padding-right: 8px;
		.badge {
			font-size: 12px;
			font-weight: 700;
			padding: 2px 6px;
			border-radius: 50%;
			position: absolute;
			background: #FFEA00;
			color: #000063;
			right: 0px;
			bottom: 0px;
		}
	}

	:global(.material-icons) {
		color: #000063;
	}

	.drawer-container {

		h2 {
			font-size: 24px;
			font-weight: 400;
			line-height: 28px;
			margin: 0;
			margin-right: 8px;
			overflow: hidden;

			a, a:focus, a:visited, a:active {
				color: #000063;
				text-decoration: none;
			}
		}
		h2.small {
			font-weight: 700;
		}
	}

	.personal-menu {
		padding: 8px;
		color: #000063;

		@media (min-width: 576px) {
			padding: 12px;
		}
		@media (min-width: 992px) {
			padding: 16px;
		}
	}

	.main-content {
		padding: 0;
		box-sizing: border-box;
	}

	.navbar {
		padding: 0;
		padding-left: 16px;
		padding-right: 4px;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 50px;
		color: #000063;
		background-color: #f0f0f0;
		z-index: 999;

		@media (min-width: 576px) {
			padding-left: 24px;
			padding-right: calc(24px - 12px);
		}
		@media (min-width: 992px) {
			padding-left: 32px;
			padding-right: calc(32px - 12px);
		}

		.personal-section {
			display: inline-block;
		}

		:global(.material-icons) {
			font-size: 32px;
		}

		.personal-menu {
			:global(.material-icons) {
				font-size: 20px;
			}
		}
	}

	.navbar-filler {
		height: 50px;
	}
</style>
