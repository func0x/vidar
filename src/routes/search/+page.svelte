<script>
	import Box from 'src/components/Box.svelte';
	import search from '$lib/images/search.svg';
	import FilterPanelSearch from 'src/components/FilterPanelSearch.svelte';
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import { onMount } from 'svelte';
	import { eventsStore } from 'src/stores/Data';
	import { page } from '$app/stores';

	let searched = [];
	let query = $page.url.searchParams.get('query') || '';

	const findEventsByTitle = (eventsData, titleParam) => {
		return eventsData.filter((item) => {
			return item.title.toLowerCase().includes(titleParam.toLowerCase());
		});
	};

	onMount(() => {
		searched = findEventsByTitle($eventsStore, $page.url.searchParams.get('query'));
	});
</script>

<Box bg="var(--grey-300)" height="80px" position="relative">
	<div>
		<input value={query} />
		<button><img src={search} alt="search" /></button>
	</div>
</Box>

<Box mt="80px">
	<FilterPanelSearch authors={[]} tags={[]} {query} count={searched.length} />
	<RecentEvents events={searched} />
</Box>

<style>
	div {
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, 50%);
		display: flex;
		border-radius: var(--border-radius-xxl);
		overflow: hidden;
		box-shadow: var(--input-shadow);
	}

	input {
		width: 75vw;
		max-width: 550px;
		height: 75px;
		padding-left: 20px;
		font-size: 16px;
		color: var(--aubergine);
		background-color: var(--search-bg-color);
	}

	button {
		width: 60px;
		background: var(--search-bg-color);
		border: none;
		cursor: pointer;
	}

	.box {
		height: calc(100vh - 160px);
		display: flex;
		flex-direction: column;
	}

	.wrapper {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: var(--gap-xl);
	}

	.spacer {
		margin-top: 80px;
	}

	.query {
		font-size: 32px;
		font-weight: var(--font-bold);
		color: var(--aubergine);
	}

	.results {
		font-size: 16px;
		color: var(--grey-700);
	}

	@media screen and (max-width: 700px) {
		input {
			height: 65px;
		}
	}
</style>
