<script>
	import Box from 'src/components/Box.svelte';
	import search from '$lib/images/search.svg';
	import noFound from '$lib/images/search_no_found.svg';
	import { onMount } from 'svelte';
	import { eventsStore } from 'src/stores/Data';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { searchedEventsStore } from 'src/stores/SearchData';
	import SearchResults from 'src/components/SearchResults.svelte';
	// import tags from '$lib/jsons/tags.json';

	let searched = [];
	let authorsSet = new Set([]);
	let tagsSet = new Set([]);
	let authors = [];
	let tags = [];
	let query;
	let queryValue = '';

	const findEventsByTitle = (eventsData, titleParam) => {
		return eventsData.filter((item) => {
			return item.title.toLowerCase().includes(titleParam.toLowerCase());
		});
	};

	const redirectToSearch = (e) => {
		authorsSet = new Set([]);
		tagsSet = new Set([]);
		const data = Object.fromEntries(new FormData(e.target).entries());
		queryValue = data.query !== '' ? data.query : 'All results';
		console.log(data.query);

		searched = findEventsByTitle($eventsStore, data.query);
		searched.forEach((element) => {
			element.authors.forEach((author) => {
				if (!authorsSet.has(JSON.stringify(author))) {
					authorsSet.add(JSON.stringify(author));
				}
			});
			tagsSet = new Set([...tagsSet, ...element.tags]);
		});

		$searchedEventsStore = searched;
		authors = Array.from(authorsSet).map((x) => JSON.parse(x));
		tags = Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
		goto(`/search?query=${query}`);
	};

	onMount(() => {
		query = $page.url.searchParams.get('query') || '';
		queryValue = query !== '' ? query : 'All results';
		searched = findEventsByTitle($eventsStore, query);
		searched.forEach((element) => {
			element.authors.forEach((author) => {
				if (!authorsSet.has(JSON.stringify(author))) {
					authorsSet.add(JSON.stringify(author));
				}
			});
			tagsSet = new Set([...tagsSet, ...element.tags]);
		});

		$searchedEventsStore = searched;
		authors = Array.from(authorsSet).map((x) => JSON.parse(x));
		tags = Array.from(tagsSet).sort((a, b) => a.localeCompare(b));
	});
</script>

<div class={searched.length === 0 ? 'box' : ''}>
	<Box bg="var(--grey-300)" height="80px" position="relative">
		<form on:submit|preventDefault={redirectToSearch}>
			<input name="query" bind:value={query} placeholder="Search..." />
			<button type="submit"><img src={search} alt="search" /></button>
		</form>
	</Box>

	<div class="spacer" />

	{#if searched.length > 0}
		<SearchResults bind:authors bind:tags bind:searched bind:queryValue />
	{:else}
		<div class="wrapper">
			<Box df tac fd="column" noRes width="fit-content">
				<span class="query">{queryValue}</span>
				<span class="results">no results found</span>
			</Box>
			<img class="no-found" src={noFound} alt="no-found" />
		</div>
	{/if}
</div>

<style>
	form {
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
