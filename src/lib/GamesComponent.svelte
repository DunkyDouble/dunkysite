<script>
	import GamesTab from '$lib/gamesTab.js';
    import Settings from '$lib/settings.js';
    import Unavailable from '$lib/unavailable.js';

	import gamesList from '$lib/games.js';
	import appsList from '$lib/apps.js';
	const sortedGamesList = gamesList.sort((game, sgame) => game.name.localeCompare(sgame.name));
	const sortedAppsList = appsList.sort((game, sgame) => game.name.localeCompare(sgame.name));

    let props = $props();

    let filteredGamesList = $state([]); // NOTE: This is also the apps list if we are told to use it
	let showAllGames = $state(false);
	let showAllGamesShow = $state(false);
    let showAllGamesNeeded = $derived($Settings.showAllGamesNeeded);
    const showAllGamesLength = 60; // how many games until we need to show the button
    $effect(() => {
        const fullList = (props.apps ? sortedAppsList : sortedGamesList)
            .filter(game => game.name.toLowerCase().replace(/\s/gim, '').includes(props.search.toLowerCase()));
        filteredGamesList = fullList
            .slice(0, (showAllGames || !showAllGamesNeeded) ? Infinity : showAllGamesLength);
        showAllGamesShow = (fullList.length > showAllGamesLength) && showAllGamesNeeded && !showAllGames;
    });
    const getGamesStatusCount = (statusList, gamesList) => {
        if (statusList === "all") {
            const allList = [].concat(...Object.keys(Unavailable).map(key => Unavailable[key]));
            const allStatusesList = gamesList.filter(game => allList.includes((new URL(game.url)).hostname));
            return gamesList.length - allStatusesList.length;
        }
        return gamesList.filter(game => statusList.includes((new URL(game.url)).hostname)).length;
    };

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
    <span style="color:#ff8a8a">{getGamesStatusCount(Unavailable.deleted, filteredGamesList)} deleted</span>
    ,
    <span style="color:#fff675">{getGamesStatusCount(Unavailable.unavailable, filteredGamesList)} unavailable</span>
    ,
    <span style="color:#6ed6ff">{getGamesStatusCount(Unavailable.cantEmbed, filteredGamesList)} cant embed</span>
    ,
    <span style="color:#d591ff">{getGamesStatusCount(Unavailable.suspicious, filteredGamesList)} suspicious</span>
    ,
    <span style="color:#ffffff">{getGamesStatusCount("all", filteredGamesList)} clean</span>
</p>
<div class="games-list">
	{#each filteredGamesList as game}
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
