<script>
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import Upcoming from 'src/components/Upcoming.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import { jsonEvents } from 'src/stores/Data';
	import { onMount } from 'svelte';

	let events = [];
	let event;
	let pastEvents = [];

	onMount(async () => {
		await jsonEvents().then((res) => (events = res));
		event = events.filter((x) => {
			if (x.upcoming === true) {
				return true;
			} else {
				pastEvents = [...pastEvents, x];
				return false;
			}
		});

		if (event.length !== 0) {
			event = event.reduce((x, y) => (x.datetime < y.datetime ? x : y));
		}
	});
</script>

<MediaQuery query="(max-width: 1115px)" let:matches>
	{#if matches}
		<SectionName title="Upcoming Livestream" />
	{/if}
</MediaQuery>
<Upcoming {event} />
<SectionName title="Explore" />
<RecentEvents events={pastEvents} />
