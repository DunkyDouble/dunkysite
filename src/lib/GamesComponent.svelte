<script>
	import games from '$lib/games.js';
	import appsList from '$lib/apps.js';
	import GamesTab from '$lib/gamesTab.js';

    let props = $props();
	let search = $derived(props.search);
	let newTab = $derived(props.newTab || false);
	let apps = $derived(props.apps || false); // looking through apps list

	let showAllGames = $state(true); // TODO: See if Chromebook devices can handle this now.
	const sortedGamesList = games.sort((game, sgame) => game.name.localeCompare(sgame.name));
	const sortedAppsList = appsList.sort((game, sgame) => game.name.localeCompare(sgame.name));

	const openGame = (url) => {
		if (url.startsWith('/')) {
			url = String(`${window.origin}/${url}`);
		}
		if (!newTab) {
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

<p style={!props.debug ? "display:none" : ""}>Text</p>
<div class="games-list">
	{#key search}
		{#each (apps ? sortedAppsList : sortedGamesList) as game, idx}
			{#if showAllGames || (idx < 60)}
				{#if game.name.toLowerCase().replace(/\s/gim, '').includes(search)}
					<button class="game" onclick={() => openGame(game.url)} data-id={game.id}>
						<img alt="GameIcon" src={game.image} draggable="false" loading="lazy" />
						<p>{game.name}</p>
					</button>
				{/if}
			{/if}
		{/each}
	{/key}
</div>
{#if !showAllGames && (apps ? sortedAppsList : sortedGamesList).length > 60}
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
	.game > img {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
	.game > p {
		position: absolute;
		left: 0;
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0.5);
		text-align: center;
		margin-block: 0;
		color: white;
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
