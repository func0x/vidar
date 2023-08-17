<script>
	import EventDetails from 'src/components/EventDetails.svelte';
	import Player from 'src/components/player/Player.svelte';
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import { page } from '$app/stores';

	export let data;
</script>

<svelte:head>
	<title>
		Vidar &#x2022;{' '}
		{data.eventWithRecomendations.event !== undefined
			? data.eventWithRecomendations.event.title
			: 'Not Found'}
	</title>

	<style>
		body {
			overflow-x: hidden;
		}
	</style>
</svelte:head>

{#key $page.params.id}
	<Player event={data.eventWithRecomendations.event} />
{/key}
<EventDetails eventCard videoFooter event={data.eventWithRecomendations.event} />
{#if data.eventWithRecomendations.recomendedEvents.length > 1}
	<SectionName title="Explore Similar" />
	<RecentEvents hover exploreSimilar events={data.eventWithRecomendations.recomendedEvents} />
{/if}
