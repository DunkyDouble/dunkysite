<script>
	import GamesTab from '$lib/gamesTab.js';
    import Unavailable from '$lib/unavailable.js';
    import SiteState from '$lib/site-state.svelte.js';
    import Settings from '$lib/stores/settings.js';

	import gamesList from '$lib/games.js';
	import appsList from '$lib/apps.js';
	const sortedGamesList = gamesList.sort((game, sgame) => game.name.localeCompare(sgame.name));
	const sortedAppsList = appsList.sort((game, sgame) => game.name.localeCompare(sgame.name));

    let props = $props();

	let showAllGames = $state(false);
	let showAllGamesShow = $state(false);
    let showAllGamesNeeded = $derived($Settings.showAllGamesNeeded);
    const showAllGamesLength = 60; // how many games until we need to show the button
    $effect(() => {
        const fullList = (props.apps ? sortedAppsList : sortedGamesList)
            .filter(game => $Settings.showDebugMenu ? true :
                !(Unavailable.deleted.includes((new URL(game.url)).hostname) || Unavailable.unavailable.includes((new URL(game.url)).hostname)));
        const searchedList = fullList
            .filter(game => game.name.toLowerCase().replace(/\s/gim, '').includes(props.search.toLowerCase()));
        SiteState.shownGames = searchedList
            .slice(0, (showAllGames || !showAllGamesNeeded) ? Infinity : showAllGamesLength);
        showAllGamesShow = (fullList.length > showAllGamesLength) && showAllGamesNeeded && !showAllGames;
    });

	const openGame = (url) => {
		if (url.startsWith('/')) {
			url = String(`${window.origin}/${url}`);
		}
		if (!props.newTab) {
			window.location.href = url;
			return;
		}
		const gameTab = new GamesTab();
		gameTab.open(url);
	};
	const showGames = () => {
		showAllGames = true;
	};
</script>

<p style={$Settings.showDebugMenu ? "" : "display:none"}>
    <span style="color:#ff8a8a">{Unavailable.getGamesStatusCount(Unavailable.deleted, SiteState.shownGames)} deleted</span>
    ,
    <span style="color:#fff675">{Unavailable.getGamesStatusCount(Unavailable.unavailable, SiteState.shownGames)} unavailable</span>
    ,
    <span style="color:#6ed6ff">{Unavailable.getGamesStatusCount(Unavailable.cantEmbed, SiteState.shownGames)} cant embed</span>
    ,
    <span style="color:#d591ff">{Unavailable.getGamesStatusCount(Unavailable.suspicious, SiteState.shownGames)} suspicious</span>
    ,
    <span style="color:#ffffff">{Unavailable.getGamesStatusCount("all", SiteState.shownGames)} clean</span>
</p>
{#if SiteState.beta}
    <p>We are working to bring more games soon! The list may change a few times for now while we work on fixing deleted games, unavailable games, and adding new games!</p>
{/if}
<div class="games-list">
	{#each SiteState.shownGames as game}
		<button class="game" onclick={() => openGame(game.url)} data-id={game.id}>
			<img class="game-icon" alt="GameIcon" src={game.image} draggable="false" loading="lazy" />
			<p class="game-name">{game.name}</p>

            {#if $Settings.showDebugMenu}
                <p class="game-debug-label">
                    {#if Unavailable.deleted.includes((new URL(game.url)).hostname)}
                        <span style="color:#ff8a8a">deleted</span>
                    {/if}
                    {#if Unavailable.unavailable.includes((new URL(game.url)).hostname)}
                        <span style="color:#fff675">unavailable</span>
                    {/if}
                    {#if Unavailable.cantEmbed.includes((new URL(game.url)).hostname)}
                        <span style="color:#6ed6ff">cantEmbed</span>
                    {/if}
                    {#if Unavailable.suspicious.includes((new URL(game.url)).hostname)}
                        <span style="color:#d591ff">suspicious</span>
                    {/if}
                </p>
            {/if}
		</button>
	{/each}
</div>
{#if showAllGamesShow}
	<button class="show-games" onclick={showGames}>
		Show all games
	</button>
{/if}

<style>
	.games-list {
		display: flex;
		flex-direction: row;
		justify-content: center;
		flex-wrap: wrap;
		width: 80%;
	}
	.game {
		position: relative;
		border-radius: 4px;
		width: 128px;
		height: 128px;
		border: 1px solid rgba(0, 0, 0, 0.25);
		background: white;
		overflow: hidden;
		cursor: pointer;
		margin: 4px;
	}
	.game:hover {
		filter: brightness(1.15);
	}
	.game:active {
		filter: brightness(0.7);
	}
	.game-icon {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.game-name {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		margin-block: 0;

		background: rgba(0, 0, 0, 0.5);
		text-align: center;
		color: white;

        z-index: 2;
	}
    .game-debug-label {
        position: absolute;
        left: 4px;
        top: 4px;
		margin-block: 0;

        text-shadow: 1px 1px 5px black, 1px 1px 5px black, 1px 1px 5px black;

        z-index: 5;
    }
    .game-debug-label span {
        display: block;
        font-weight: bold;
    }

	.show-games {
		width: 50%;
		height: 96px;
		margin: 32px 0;
		padding: 16px 0;
		font-size: 32px;
		cursor: pointer;
		border: 1px solid rgba(0, 0, 0, 0.25);
		background: #008547;
		color: white;
		border-radius: 4px;
	}
</style>
