<script>
	let url = $state('');
	const visit = () => {
		window.location.replace(url);
	};
</script>

<h1>Developer Page</h1>
<p>Website URL:</p>
<input type="text" class="goob" bind:value={url} placeholder="URL">
<button onclick={visit}>Go</button>

<style>
	.goob {
		width: 100%;
	}
</style>