<script>
	import { onMount } from "svelte";
	import MarkdownIt from "markdown-it";

	const md = new MarkdownIt({
		html: true,
        	linkify: true,
        	breaks: true,
    	});
    
	export let post = '';
	let postHtml = '';

	const defaultLinkOpenRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
        	return self.renderToken(tokens, idx, options);
    	};
	md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
            	tokens[idx].attrSet('target', '_blank');

        	// Pass the token to the default renderer.
        	return defaultLinkOpenRender(tokens, idx, options, env, self);
    	};
    
	onMount(() => {
        	const env = {};
        	const tokens = md.parse(post, env);

        	postHtml = md.renderer.render(tokens, md.options, env);
    	});
</script>

<div class="post">
	{@html postHtml}
</div>

<style>
	.post {
		border-radius: 8px;
        	border: 1px solid rgb(119, 255, 192);
        	margin: 16px;
        	padding: 10px 20px;
        	background: rgb(6, 21, 15);
        	color: white;
	}
	:global(a) {
		color: rgb(0, 255, 136);
	}
	:global(b),
	:global(strong) {
		font-weight: bold;
	}
</style>
