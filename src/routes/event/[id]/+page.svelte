<script>
	import EventDetails from 'src/components/EventDetails.svelte';
	import Player from 'src/components/player/Player.svelte';
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	export let data;

	onMount(() => {
		const loader = document.querySelector('.loader');
		const application = document.querySelector('.application');
		loader.style.display = 'none';
		application.style.display = 'block';
	});
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
	<EventDetails eventCard videoFooter event={data.eventWithRecomendations.event} />
{/key}
{#if data.eventWithRecomendations.recomendedEvents.length > 1}
	<SectionName title="Explore Similar" />
	<RecentEvents hover exploreSimilar events={data.eventWithRecomendations.recomendedEvents} />
{/if}
