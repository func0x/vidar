<script>
	import FilterPanel from 'src/components/FilterPanel.svelte';

	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import Upcoming from 'src/components/Upcoming.svelte';
	import { filtered } from 'src/stores/Data';

	export let data;

	const { event } = data.all;
	const { tags, authors } = data;
</script>

<Upcoming {event} />
<SectionName title="Explore" />
<FilterPanel {tags} {authors} />
<RecentEvents hover events={$filtered} />
