<script>
	import games from '$lib/games.js';
	import appsList from '$lib/apps.js';
    import Unavailable from '$lib/unavailable.js';

    let testStarted = $state(false);
    let currentIndex = 0;
    let currentEndIndex = 9;

    const getOriginUrl = (url = "") => {
        const urlObj = new URL(url);
        return urlObj.origin;
    };
    const getHostname = (url = "") => {
        const urlObj = new URL(url);
        return urlObj.hostname;
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
                {#if Unavailable.deleted.includes(getHostname(gameUrl))}
                    <p style="color:#ff8a8a">deleted</p>
                {:else if Unavailable.unavailable.includes(getHostname(gameUrl))}
                    <p style="color:#fff675">unavailable</p>
                {:else if Unavailable.cantEmbed.includes(getHostname(gameUrl))}
                    <p style="color:#6ed6ff">cant embed</p>
                {:else if Unavailable.suspicious.includes(getHostname(gameUrl))}
                    <p style="color:#d591ff">suspicious</p>
                {/if}
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
        margin: 4px 0;
    }
    .game > p:nth-child(3) {
        word-wrap: break-word;
    }
</style>