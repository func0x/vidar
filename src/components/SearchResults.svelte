<script>
	import FilterPanelSearch from './FilterPanelSearch.svelte';
	import RecentEvents from './RecentEvents.svelte';
	import { eventsStore } from 'src/stores/Data';
	import { page } from '$app/stores';
	import { searchedEventsStore, searchedFiltered } from 'src/stores/SearchData';
	import { onMount } from 'svelte';

	export let authors;
	export let tags;
	export let searched;
	let query;
	let authorsSet = new Set([]);
	let tagsSet = new Set([]);

	const findEventsByTitle = (eventsData, titleParam) => {
		return eventsData.filter((item) => {
			return item.title.toLowerCase().includes(titleParam.toLowerCase());
		});
	};

	onMount(() => {
		query = $page.url.searchParams.get('query') || '';
		if (query !== '') {
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
			tags = Array.from(tagsSet);
		}
	});
</script>

<FilterPanelSearch
	{authors}
	{tags}
	query={$page.url.searchParams.get('query') || 'Unknown parameter'}
	count={searched.length}
/>
<RecentEvents events={$searchedFiltered} />
