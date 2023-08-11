<script>
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import Upcoming from 'src/components/Upcoming.svelte';

	export let data;

	const { event, pastEvents } = data.events;
</script>

<Upcoming {event} />
<SectionName title="Explore" />
<RecentEvents events={pastEvents} />
