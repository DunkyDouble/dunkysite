<script>
	import { onMount } from 'svelte';
    
	import GamesTab from '$lib/gamesTab.js';
    import SiteState from '$lib/state/site.svelte.js';
    import Settings from '$lib/stores/settings.js';

    let secretValue = $state("");
	const onSecretChanged = () => {
		switch (secretValue) {
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
			case 'resetonboarding': {
				const gameTab = new GamesTab();
				gameTab.open(`${window.origin}/secret/resetonboarding`);
				break;
			}
			case 'test': {
				const gameTab = new GamesTab();
				gameTab.open(`${window.origin}/secret/test`);
				break;
			}
		}
	};
	const onOpenTabCountChanged = (event) => {
		// TODO: make it so updating tab count limits it
		const realCount = Math.max(1, Math.min(10, Math.round(event.target.value)));
		event.target.value = realCount;
		$Settings.openTabCount = realCount;
	};
</script>

<p>Your username is: <span class="green"><i>{$Settings.username}</i></span></p>
<div class="setting setting-right">
    <div><label>
        Tab Disguise
		<div>
        	<input
				type="range"
				min="0"
				max="1"
				step="0.0000001"
				bind:value={$Settings.tabDisguiseIntensity}
			/>
			<div class="setting-percent"><em>
				{Math.round($Settings.tabDisguiseIntensity * 100)}%
			</em></div>
		</div>
    </label></div>
    <span>Adjust the intensity to try and hide your tab. This will cover your game with a document and make the game transparent.</span>
</div>
<div class="setting setting-right">
    <div><label>
        How many tabs to open?
		<div>
        	<input
				type="number"
				min="1"
				max="10"
				step="1"
				value={$Settings.openTabCount}
				oninput={onOpenTabCountChanged}
			/>
		</div>
    </label></div>
    <span>Change this number to open more than 1 tab. Each extra tab will show a button to load the game.</span>
</div>
<div class="setting">
    <div><label>
        <input type="checkbox" bind:checked={$Settings.showAllGamesNeeded}>
        Hide too many games behind a button on startup
    </label></div>
    <span>Only shows a few games in the list when you first open the website, useful if your computer starts lagging immediately.</span>
</div>
<div class="setting setting-right">
    <div><label>
        Custom Server
		<div>
        	<input
				type="text"
				bind:value={$Settings.externalServer}
			/>
		</div>
    </label></div>
    <span>
        Connect to a custom server for specific games.
        If you want to add this, contact me to set this up for you.
        For developers, add a hostname with port 19136 open.
    </span>
</div>
<div class="setting">
    <div><label>
        <input type="checkbox" bind:checked={$Settings.showDebugMenu}>
        Show Developer menus
    </label></div>
    <span>Adds small information to some menus and elements. Not useful for normal users.</span>
</div>
<a target="_blank" href="/terms">Terms of Service</a>
<a target="_blank" href="/privacy">Privacy Policy</a>
<p>
    Thanks to 3kh0, gn-math, genizy, scheng123321, unxa, udbsite, 98corbins, burnedpopcorn, irv77, bubbls,
    reunbozdo, Irusso, FreeSwfGames, unxw, irv77, GalacticNetwork for creating huge libraries of assets and game ports
</p>
<input
    class="secret-bar"
    type="text"
    placeholder="Coder Debug..."
    bind:value={secretValue}
    onchange={onSecretChanged}
/>

<style>
	:global(a),
    .green {
		color: rgb(0, 255, 136);
	}

	.secret-bar,
    .setting input[type="text"],
    .setting input[type="number"] {
		border: 1px solid white;
		background: rgba(255, 255, 255, 0.1);
		color: white;
		padding: 4px;
		border-radius: 4px;
	}
	.secret-bar {
		position: absolute;
		right: 4px;
		bottom: 4px;
	}
    
    .setting {
		display: block;
        width: 60%;
    	margin-block-start: 1em;
    	margin-block-end: 1em;
    }
    .setting > span:nth-child(1),
    .setting > div:nth-child(1) {
        display: block;
        height: 2em;
    }
    .setting > span:nth-child(1) label,
    .setting > div:nth-child(1) label {
        display: flex;
        flex-direction: row;
        align-items: center;

        font-weight: bold;
        font-size: large;
        
        cursor: pointer;
    }
	.setting-right > span:nth-child(1) label,
	.setting-right > div:nth-child(1) label {
        justify-content: space-between;
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
	.setting-percent {
		width: 3em;
		display: inline-block;
	}
</style>