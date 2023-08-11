<script>
	import FilterPanelSearch from './FilterPanelSearch.svelte';
	import RecentEvents from './RecentEvents.svelte';
	import { page } from '$app/stores';
	import { searchedFiltered } from 'src/stores/SearchData';

	export let authors;
	export let tags;
	export let searched;
	export let queryValue;
</script>

{#key queryValue}
	<FilterPanelSearch
		{authors}
		{tags}
		query={queryValue || 'Unknown parameter'}
		count={searched.length}
	/>
{/key}
<RecentEvents hover events={$searchedFiltered} />
