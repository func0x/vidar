<script>
	import EventDetails from 'src/components/EventDetails.svelte';
	import Player from 'src/components/player/Player.svelte';
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import { page } from '$app/stores';

	export let data;
</script>

{#key $page.params.id}
	<Player event={data.eventWithRecomendations.event} />
{/key}
<EventDetails eventCard videoFooter event={data.eventWithRecomendations.event} />
{#if data.eventWithRecomendations.recomendedEvents.length > 1}
	<SectionName title="Explore Similar" />
	<RecentEvents events={data.eventWithRecomendations.recomendedEvents} />
{/if}
