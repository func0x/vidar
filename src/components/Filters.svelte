<script>
	import { onMount } from 'svelte';

	import AuthorInput from './AuthorInput.svelte';

	import Box from './Box.svelte';
	import DatePicker from './DatePicker.svelte';
	import Tag from './Tag.svelte';

	export let dateFrom;
	export let dateTo;
	export let selectedAuthor;
	export let author;
	export let tags;
	export let authors;
	export let tagClickEvent;
	export let initSelectTags;
	export let boxRef;
	export let dc; // display inputs in column

	let tagBg = 'var(--grey-300)';
	let hbg = 'var(--grey-700)'; // tag hover bg color
	let hc = 'var(--white)'; // hover color
	let fs = 'var(--font-s)'; // font size

	onMount(() => {
		tagClickEvent(boxRef);
		initSelectTags(boxRef);
	});
</script>

<Box df fd="column" gap="var(--gap-m)">
	<Box df fd={dc ? 'column' : 'row'} gap="var(--gap-l)">
		{#key false}
			<DatePicker label="From" bind:date={dateFrom} />
			<DatePicker label="To" bind:date={dateTo} />
		{/key}
		<AuthorInput {authors} bind:selectedAuthor bind:authorName={author} />
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
