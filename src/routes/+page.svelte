<script>
	import * as environment from '$app/environment';
	import FilterPanel from 'src/components/FilterPanel.svelte';

	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import Upcoming from 'src/components/Upcoming.svelte';
	import { filtered } from 'src/stores/Data';
	import { onMount } from 'svelte';

	export let data;

	const { event } = data.all;
	const { tags, authors } = data;

	onMount(() => {
		const loader = document.querySelector('.loader');
		const application = document.querySelector('.application');
		loader.style.display = 'none';
		application.style.display = 'block';
	});
</script>

<svelte:head>
	<title>Vidar &#x2022; Home</title>
</svelte:head>

{#if environment.browser === true}
	{#if event}
		<Upcoming {event} />
	{/if}
	<SectionName title="Explore" />
	<FilterPanel {tags} {authors} />
	<RecentEvents hover events={event.upcoming ? $filtered.filter((x) => x.upcoming === false) : $filtered.slice(1).filter((x) => x.upcoming === false)} />
{/if}
