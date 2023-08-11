<script>
	import FilterPanel from 'src/components/FilterPanel.svelte';

	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import Upcoming from 'src/components/Upcoming.svelte';

	export let data;

	const { event, pastEvents } = data.all;
</script>

<Upcoming {event} />
<SectionName title="Explore" />
<FilterPanel />
<RecentEvents hover events={pastEvents} />
