<script>
	import 'src/routes/styles.css';
	import DesktopNavigation from 'src/components/navigation/DesktopNavigation.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches}
		<DesktopNavigation />
	{/if}
</MediaQuery>

<slot />
