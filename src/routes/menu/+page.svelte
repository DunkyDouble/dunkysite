<script>
	import { onMount } from 'svelte';
    
	import GamesComponent from '$lib/GamesComponent.svelte';
	import BlogComponent from '$lib/BlogComponent.svelte';

	import GamesTab from '$lib/gamesTab.js';
    import Settings from '$lib/settings.js';
    import SiteState from '$lib/site-state.svelte.js';

	import gamesList from '$lib/games.js';
	import appsList from '$lib/apps.js';
	import blogPosts from '$lib/blog';

	const options = $state({
		search: '',
		secret: '',
		newTab: true,
		activeTab: 'home'
	});
	const state = $derived({
		confirmed: $Settings.usernameSetup,
		locked: false,
		name: ''
	});
    const tryConfirmUsername = () => {
        const username = String($Settings.username);
        if (!username) return;
        const fixedUsername = username.replace(/[\n\r]+/g, "").trim();
        if (!fixedUsername) return;
        if (fixedUsername.length <= 0) return;
        if (fixedUsername.length > 50) return alert("That name is too long.");
        $Settings.username = fixedUsername;
        $Settings.usernameSetup = true;
    };
	const setActiveTab = (type) => {
		options.activeTab = type;
	};

	const onSecretChanged = () => {
		switch (options.secret) {
			case 'anything': {
				const gameTab = new GamesTab();
				gameTab.open(`${window.origin}/secret`);
				break;
			}
			case 'unittest': {
				const gameTab = new GamesTab();
				gameTab.open(`${window.origin}/secret/unittest`);
				break;
			}
			case 'test': {
				const gameTab = new GamesTab();
				gameTab.open(`${window.origin}/secret/test`);
				break;
			}
		}
	};
</script>

{#if SiteState.beta}
    <div class="beta-bar">
    	<p>BETA</p>
    </div>
{/if}
{#if state.locked}
	<div class="main center">
		<p>Forbidden</p>
        <p><a href="/info">Information</a></p>
        <p><a href="/terms">Terms of Service</a></p>
        <p><a href="/privacy">Privacy Policy</a></p>
	</div>
{:else if !state.confirmed}
	<div class="main unconfirmed">
		<h3>What is your name?</h3>
        <input type="text" bind:value={$Settings.username}>
		<p class="subtext" style="opacity: 1">This will let me know who you are if you have issues with the website.</p>
		<button class="login" onclick={tryConfirmUsername}>Enter</button>
        
        <div class="unconfirmed-legal">
            <span class="subtext" style="opacity: 1">By entering the games page, you agree to these documents:</span>
            <a target="_blank" href="/terms">Terms of Service</a>
            <a target="_blank" href="/privacy">Privacy Policy</a>
        </div>
	</div>
{:else}
	<div class="main center">
		<div style="height:32px;width:100%"></div>
		<h1 class="big-title">
			{#if options.activeTab === 'settings'}
				Settings
			{:else if options.activeTab === 'apps'}
				Apps
			{:else if options.activeTab === 'suggestions'}
				Suggestions
			{:else if options.activeTab === 'blog'}
				Updates
			{:else}
				Games
			{/if}
		</h1>
		<div class="line" style="width:50%;height:0.5px"></div>
		<div class="center-row page-tabs">
			<button class="page-tab" onclick={() => setActiveTab('home')}>
				<h1>Games</h1>
			</button>
			<!-- <button class="page-tab" onclick={() => setActiveTab('apps')}>
				<h1>Apps</h1>
			</button> -->
			<button class="page-tab" onclick={() => setActiveTab('blog')}>
				<h1>Updates</h1>
			</button>
			<button class="page-tab" onclick={() => setActiveTab('suggestions')}>
				<h1>Suggestions</h1>
			</button>
			<button class="page-tab" onclick={() => setActiveTab('settings')}>
				<h1>Settings</h1>
			</button>
		</div>
		<div class="line" style="width:50%;height:0.5px"></div>
		{#if options.activeTab === 'home' || options.activeTab === 'apps'}
			<p>
				{SiteState.shownGames.length}
				{options.activeTab === 'apps' ? 'apps' : "games"} |
				<input class="search-bar" type="text" placeholder="Search..." bind:value={options.search} />
				|
				<label>
					<input type="radio" name="newtab" value={true} bind:group={options.newTab} />
					Open in new tab
				</label>
				<label>
					<input type="radio" name="newtab" value={false} bind:group={options.newTab} />
					Open in this tab
				</label>
			</p>
			<GamesComponent search={options.search} apps={options.activeTab === 'apps'} newTab={options.newTab} />
		{:else if options.activeTab === 'settings'}
			<p class="setting">
                <span><label>
                    <input type="checkbox" bind:checked={$Settings.showAllGamesNeeded}>
                    Hide too many games behind a button on startup
                </label></span>
                <span>Only shows a few games in the list when you first open the website, useful if your computer starts lagging immediately.</span>
            </p>
			<p class="setting">
                <span><label>
                    <input type="checkbox" bind:checked={$Settings.showDebugMenu}>
                    Show Developer menus
                </label></span>
                <span>Adds small information to some menus and elements. Not useful for normal users.</span>
            </p>
            <a target="_blank" href="/terms">Terms of Service</a>
            <a target="_blank" href="/privacy">Privacy Policy</a>
            <p>
                Thanks to 3kh0, gn-math, genizy, scheng123321, unxa, udbsite, 98corbins, burnedpopcorn, irv77, bubbls,
                reunbozdo, Irusso, FreeSwfGames for creating huge libraries of assets and game ports
            </p>
			<input class="secret-bar" type="text" placeholder="Coder Debug..." bind:value={options.secret} onchange={onSecretChanged} />
		{:else if options.activeTab === 'blog'}
			{#each blogPosts as blogPost}
				<BlogComponent post={blogPost} />
			{/each}
		{:else if options.activeTab === 'suggestions'}
			<iframe
				title="Game Suggestions"
				src="https://docs.google.com/forms/d/e/1FAIpQLSfaoTnTjiY5ctZvqYP8DowI3zPSkaJGhYh233VJrLD0XYv1WA/viewform?embedded=true"
				width="640"
				height="1053"
				frameborder="0"
				marginheight="0"
				marginwidth="0"
			>
				Loading…
			</iframe>
		{/if}
	</div>
{/if}

<style>
	.main {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: #0b140a;
		color: white;
		overflow: auto;
	}
	.center {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.center-row {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	b {
		font-weight: bold;
	}

	.unconfirmed {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
    .unconfirmed-legal {
        margin-top: 32px;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
    }
	.subtext {
		margin-block: 4px;
		opacity: 0.5;
		font-size: 12px;
	}
	.login {
		margin-top: 4px;
		padding: 6px 12px;
		border-radius: 4px;
		background: rgb(23, 117, 211);
		border: 1px solid rgba(0, 0, 0, 0.2);
		color: white;
		font-size: large;
		cursor: pointer;
	}

	.beta-bar {
		position: fixed;
		left: 12px;
		top: 12px;
		z-index: 99999;
		background: dodgerblue;
		color: white;
		font-size: 36px;
		padding: 4px 16px;
		border-radius: 4px;
		border: 1px solid white;
	}
	.beta-bar p {
		margin-block: 0;
	}

	.secret-bar,
	.search-bar,
    .unconfirmed input[type="text"] {
		border: 1px solid white;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		padding: 4px;
		border-radius: 4px;
	}
    .unconfirmed input[type="text"] {
        margin-bottom: 8px;
    }
	.secret-bar {
		position: absolute;
		right: 4px;
		bottom: 4px;
	}

	.page-tabs {
		width: 75%;
		justify-content: space-evenly;
	}
	.page-tab {
		margin: 8px 0;
		width: calc((100% / 5) - 16px);
		border-radius: 16px;
		background: transparent;
		color: white;
		border: 0;
		cursor: pointer;
		transition-duration: 0.25s;
	}
	.page-tab:active {
		background: rgba(255, 255, 255, 0.3);
		transition-duration: 0.25s;
	}

	.big-title {
		font-size: 4rem;
		font-weight: bold;
	}
	.line {
		border: white 1px solid;
		background: white;
		width: 0;
		height: 0;
		outline: none;
	}

    .setting {
        width: 60%;
    }
    .setting > span:nth-child(1) {
        display: block;
        height: 2em;
    }
    .setting > span:nth-child(1) label {
        display: flex;
        flex-direction: row;
        align-items: center;

        font-weight: bold;
        font-size: large;
        
        cursor: pointer;
    }
    .setting label input[type="checkbox"] {
        width : 1.5em;
        height: 1.5em;
        margin-right: 8px;
    }
    .setting > span:nth-child(2) {
        font-style: italic;
        opacity: 0.75;
    }
</style>
