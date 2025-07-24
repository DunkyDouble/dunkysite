<script>
	import games from '$lib/games.js';
	import appsList from '$lib/apps.js';

    let testStarted = $state(false);
    let currentIndex = 0;
    let currentEndIndex = 9;

    const getOriginUrl = (url = "") => {
        const urlObj = new URL(url);
        return urlObj.origin;
    };

    let currentTestSet = $state([]);
    const getTotalSet = () => {
        const gamesList = games.map(game => {
            return getOriginUrl(game.url);
        });
        const appList = appsList.map(app => {
            return getOriginUrl(app.url);
        });

        const totalRawList = [].concat(gamesList, appList);
        const totalNoDuplicatesList = [...new Set(totalRawList)];
        return totalNoDuplicatesList;
    };
    const setTestSet = () => {
        const totalSet = getTotalSet();
        currentTestSet = totalSet.slice(currentIndex, currentEndIndex);
    };

	const startTest = () => {
		testStarted = true;
        setTestSet();
	};
	const incrementTest = () => {
		currentIndex += 9;
        currentEndIndex += 9;
        setTestSet();
	};
</script>

<h1>Unit Test</h1>
<p>This will open all game URL origins on the site in packs of 9.</p>
{#if !testStarted}
    <button onclick={startTest}>Start Test</button>
{:else}
    <button onclick={incrementTest}>Next</button>
    
    <div class="container">
        {#each currentTestSet as gameUrl}
            <div class="game">
                <iframe src={gameUrl} title={gameUrl}></iframe>
                <p>{gameUrl}</p>
            </div>
        {/each}
    </div>
{/if}

<style>
	iframe {
		width: 300px;
		height: 200px;
	}
    .container {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .game {
		width: 300px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .game > p {
        word-wrap: break-word;
    }
</style>