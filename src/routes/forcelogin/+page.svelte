<script>
	import GamesTab from '$lib/gamesTab.svelte.js';

	const openGameTab = () => {
		const tab = new GamesTab("menu");
		const url = tab.makeUrl();
		tab.open(url);
	};
</script>

<div class="page">
	<p style="font-size:24px">Welcome to the DunkySite</p>
	<button onclick={openGameTab}>Enter Games</button>
	<p>
        By entering the games page, you agree to the latest
        <a href="/terms" target="_blank">Terms of Service</a>
        and
        <a href="/privacy" target="_blank">Privacy Policy</a>
    </p>
</div>

<style>
	.page {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	p {
		color: white;
		text-shadow: 2px 2px 10px black, 2px 2px 10px black, 2px 2px 10px black;
	}
    a {
        color: rgb(255, 255, 255);
        font-weight: bold;
    }

    button {
        font-size: 64px;
		padding: 16px;
		cursor: pointer;

		background: dodgerblue;
		border: 2px solid rgba(0, 0, 0, 0.3);
		border-radius: 8px;
		color: white;
    }
	button:active {
		filter: brightness(0.8);
	}
</style>
