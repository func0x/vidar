<script>
	import { searchedDateRangeStore, searchedDateTypeStore } from 'src/stores/SearchData';

	import { onMount } from 'svelte';

	import AuthorInput from './AuthorInput.svelte';

	import Box from './Box.svelte';
	import DatePicker from './DatePicker.svelte';
	import SearchSelectTime from './SearchSelectTime.svelte';
	import Tag from './Tag.svelte';

	export let selectedAuthor;
	export let author;
	export let tags;
	export let authors;
	export let tagClickEvent;
	export let initSelectTags;
	export let boxRef;
	export let dc = false; // display inputs in column

	let tagBg = 'var(--grey-300)';
	let hbg = 'var(--grey-700)'; // tag hover bg color
	let hc = 'var(--white)'; // hover color
	let fs = 'var(--font-s)'; // font size
	let options = ['Any Time', 'Last 30 days', 'Last 3 months', 'On', 'Before', 'After', 'Range'];

	onMount(() => {
		tagClickEvent();
		initSelectTags();
	});
</script>

<Box df fd="column" gap="var(--gap-m)">
	<Box df fd={dc ? 'column' : 'row'} gap={dc ? 'var(--gap-m)' : 'var(--gap-l)'}>
		{#key $searchedDateTypeStore}
			<SearchSelectTime {options} />
		{/key}
		{#if $searchedDateTypeStore === 'On' || $searchedDateTypeStore === 'Before' || $searchedDateTypeStore === 'After'}
			<DatePicker label={$searchedDateTypeStore} bind:date={$searchedDateRangeStore.start_date} />
		{/if}
		{#if $searchedDateTypeStore === 'Range'}
			<DatePicker label="From" bind:date={$searchedDateRangeStore.start_date} />
			<DatePicker label="From" bind:date={$searchedDateRangeStore.end_date} />
		{/if}
		<AuthorInput {authors} search bind:selectedAuthor bind:authorName={author} />
	</Box>
	<span class="select-tags">Select tags</span>
	<Box bind:boxRef df fw gap="var(--gap-m)">
		{#each tags as tag}
			<Tag text={tag} bg={tagBg} {hbg} {hc} {fs} />
		{/each}
	</Box>
</Box>

<style>
	.select-tags {
		color: var(--grey-700);
	}
</style>
