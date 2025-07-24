<script>
    import { page } from "$app/state";
</script>

<h1>{page.status}</h1>
<p>{page.error.message}</p>
<br />
<p>Encountering this error often? Try re-opening the site.</p>

<p><a href="/info">Information</a></p>
<p><a href="/terms">Terms of Service</a></p>
<p><a href="/privacy">Privacy Policy</a></p>