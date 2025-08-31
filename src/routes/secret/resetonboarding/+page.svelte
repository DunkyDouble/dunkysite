<script>
	import { onMount } from 'svelte';
    
    import Settings from '$lib/stores/settings.js';

    let currentMessage = $state("Nothing has been reset yet");
    const resetUsernameSetup = () => {
        $Settings.usernameSetup = false;
        currentMessage = `Reset usernameSetup (${Date.now()})`;
    };
</script>

<p>resetonboarding</p>
<p>{currentMessage}</p>
<button onclick={resetUsernameSetup}>Reset usernameSetup</button>