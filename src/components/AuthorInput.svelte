<script>
	import Box from './Box.svelte';
	import MultipleSpeakersList from './MultipleSpeakersList.svelte';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { authorStore } from 'src/stores/Data';
	import { goto } from '$app/navigation';

	export let authors;
	export let authorName;
	export let selectedAuthor = null;
	export let search = false;

	let timer;
	let filterAuthors = [];
	let value = JSON.parse($page.url.searchParams.get('speaker')) || '';
	let speakersListRef;

	const findAuthorByName = (name) => {
		if (speakersListRef) {
			speakersListRef.style.display = 'flex';
		}

		if (typeof name === 'string' || name instanceof String) {
			return authors.filter((item) => {
				return (
					item.name.toLowerCase().includes(name.toLowerCase()) ||
					item.id.toLowerCase().includes(name.toLowerCase())
				);
			});
		}
	};

	const debounce = (v) => {
		clearTimeout(timer);
		timer = setTimeout(() => {
			value = v;
			filterAuthors = findAuthorByName(v);
		}, 500);

		if (v === '') {
			filterAuthors = [];
			goto(`?${$page.url.searchParams.toString()}`, {
				noScroll: true,
				replaceState: true,
				keepFocus: true
			});
		}
	};

	onMount(() => {
		if (typeof value === 'string' || value instanceof String) {
			$authorStore = value;
		}
	});
</script>

<Box width="fit-content" df fd="column" gap="var(--gap-xs)" position="relative">
	<span>Speaker</span>
	<input on:keyup={({ target: { value } }) => debounce(value)} bind:value={authorName} />
	{#if filterAuthors.length > 0 && authorName !== ''}
		<MultipleSpeakersList
			ai
			{search}
			authors={filterAuthors}
			bind:selectedAuthor
			bind:authorName
			bind:ref={speakersListRef}
		/>
	{/if}
</Box>

<style>
	span {
		font-size: var(--font-m);
		color: var(--aubergine);
	}

	input {
		border: 1px solid rgba(103, 113, 137, 0.3);
		padding: 4px 6px;
		border-radius: 3px;
		width: 241px;
	}
</style>
