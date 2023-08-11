<script>
	import EventDetails from 'src/components/EventDetails.svelte';
	import Player from 'src/components/player/Player.svelte';
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';

	export let data;

	const { event, recomendedEvents } = data.eventWithRecomendations;
</script>

<Player />
<EventDetails eventCard videoFooter {event} />
<SectionName title="Explore Similar" />
<RecentEvents events={recomendedEvents} />
