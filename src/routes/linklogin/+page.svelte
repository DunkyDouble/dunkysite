<script>
	import { onMount } from 'svelte';

	import GamesTab from '$lib/gamesTab.svelte.js';

	let keyIsDown = false;
	const openGameTab = (event) => {
		if (!keyIsDown) return;
		event.preventDefault();
		const tab = new GamesTab("test2");
		const url = tab.makeUrl();
		tab.open(url);
	};

	onMount(() => {
		window.addEventListener("keydown", (event) => {
			if (event.key === "d") keyIsDown = true;
		});
		window.addEventListener("keyup", (event) => {
			if (event.key === "d") keyIsDown = false;
		});
	});
</script>

<main class="page">
	<a href="about:blank" target="_blank" onclick={openGameTab}>Citing sources</a>
	<a href="https://historydaily.com/about" target="_blank">About</a>
	<a href="https://historydaily.com/p/privacy-policy" target="_blank">Privacy Policy</a>
</main>

<style>
	.page {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		display: flex;
		flex-direction: column;
	}

	a {
		width: 25%;
		margin-block: 1em;

		font-size: 1rem;
		font-family: 'Times New Roman', Times, serif;
	}
</style>
