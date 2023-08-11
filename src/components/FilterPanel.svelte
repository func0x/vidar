<script>
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import Select from './Select.svelte';
	import filter from '$lib/images/filter.svg';
	import filterWhite from '$lib/images/filter_white.svg';
	import Tag from './Tag.svelte';
	import DatePicker from './DatePicker.svelte';
	import AuthorInput from './AuthorInput.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authorStore, dateRangeStore, selectedTagsStore } from 'src/stores/Data';
	import { getDayAndMonthJsDate, jsDateToLuxonTimestamp } from 'src/utils/date';
	import deleteIcon from '$lib/images/delete.svg';
	import AuthorName from './AuthorName.svelte';
	import Filters from './Filters.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';

	export let tags;
	export let authors;
	const options = ['Latest', 'Earliest'];

	function findAuthorByName(authorName) {
		return authors.find((item) => {
			return item.name === authorName;
		});
	}

	let open = false;
	let boxRef;
	let buttonRef;
	let dateFrom =
		JSON.parse($page.url.searchParams.get('date'))?.from != null
			? new Date(JSON.parse($page.url.searchParams.get('date')).from)
			: null;
	let dateTo =
		JSON.parse($page.url.searchParams.get('date'))?.to != null
			? new Date(JSON.parse($page.url.searchParams.get('date')).to)
			: null;
	let selectedTags = new Set(JSON.parse($page.url.searchParams.get('tags')));
	let params = Array.from(selectedTags);
	let author = JSON.parse($page.url.searchParams.get('speaker'));
	let selectedAuthor = findAuthorByName(author);

	const initSelectTags = () => {
		Object.entries(boxRef.children).forEach(([_, value]) => {
			if (selectedTags.has(value.textContent)) {
				value.style.backgroundColor = 'var(--aubergine)';
				value.style.color = 'var(--white)';
			} else {
				value.style.backgroundColor = 'var(--grey-300)';
				value.style.color = 'var(--aubergine)';
			}
		});
	};

	const onFiltersButtonClick = () => {
		open = !open;

		if (open) {
			buttonRef.style.backgroundColor = 'var(--aubergine)';
			buttonRef.style.color = 'var(--white)';
			buttonRef.firstChild.src = filterWhite;
		} else {
			buttonRef.style.backgroundColor = 'var(--white)';
			buttonRef.style.color = 'var(--aubergine)';
			buttonRef.firstChild.src = filter;
		}
	};

	const changeSelected = (event) => {
		Object.entries(boxRef.children).forEach(([_, value]) => {
			if (value === event.target) {
				if (selectedTags.has(value.textContent)) {
					selectedTags.delete(value.textContent);
				} else {
					selectedTags.add(value.textContent);
				}

				params = Array.from(selectedTags);
				$page.url.searchParams.set('tags', JSON.stringify(params));
				selectedTagsStore.set(params);
				goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
			}
		});

		initSelectTags();
	};

	const addClickTagEvent = () => {
		Object.entries(boxRef.children).forEach(([_, value]) => {
			value.addEventListener('click', (event) => changeSelected(event));
		});
	};

	const deleteTagFromFilter = (tagName) => {
		selectedTags.delete(tagName);
		params = params.filter((x) => x !== tagName);
		selectedTagsStore.set(params);

		initSelectTags();

		$page.url.searchParams.set('tags', JSON.stringify(Array.from(selectedTags)));
		goto(`?${$page.url.searchParams.toString()}`, {
			noScroll: true,
			replaceState: true
		});
	};

	const deleteSpeakerFromFilter = () => {
		author = '';
		$authorStore = '';
		$page.url.searchParams.set('speaker', JSON.stringify(''));
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
	};

	const deleteDateFromFilter = () => {
		dateFrom = null;
		dateTo = null;

		dateRangeStore.set({
			from: jsDateToLuxonTimestamp(dateFrom, 'from'),
			to: jsDateToLuxonTimestamp(dateTo, 'to')
		});

		$page.url.searchParams.set('date', JSON.stringify({ from: dateFrom, to: dateTo }));
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
	};

	onMount(() => {
		selectedTagsStore.set({ from: NaN, to: NaN });

		dateRangeStore.set({
			from: jsDateToLuxonTimestamp(dateFrom, 'from'),
			to: jsDateToLuxonTimestamp(dateTo, 'to')
		});

		const subscribtion = dateRangeStore.subscribe(() => {
			$page.url.searchParams.set('date', JSON.stringify({ from: dateFrom, to: dateTo }));
			goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
		});

		return () => {
			subscribtion();
		};
	});

	$: {
		dateRangeStore.set({
			from: jsDateToLuxonTimestamp(dateFrom, 'from'),
			to: jsDateToLuxonTimestamp(dateTo, 'to')
		});
	}
</script>

<Box df fd="column" padding="0 var(--gap-l) var(--gap-l) var(--gap-l)" gap="var(--gap-m)">
	<Box cvh jsb gap="var(--gap-m)">
		<Box width="fit-content" cvh gap="var(--gap-s)">
			<span>Sort by:</span>
			<Select {options} />
		</Box>
		<!-- <TagPanel -->
		<!-- 	tags={categories} -->
		<!-- 	fp -->
		<!-- 	tagBg="var(--white)" -->
		<!-- 	hbg="var(--grey-500)" -->
		<!-- 	hc="var(--aubergine)" -->
		<!-- 	fs="var(--font-m)" -->
		<!-- /> -->
		<Button
			icon={filter}
			bind:ref={buttonRef}
			onClick={onFiltersButtonClick}
			text="Filters"
			bg="var(--white)"
			border="1px solid var(--grey-500)"
		/>
	</Box>

	<Box ch gap="var(--gap-xl)">
		{#if params.length > 0}
			<Box ch gap="var(--gap-m)" width="fit-content">
				<span class="select-tags">TAGS:</span>
				{#key params}
					{#each params as tag (tag)}
						<Tag ft text={tag} onDelete={deleteTagFromFilter} />
					{/each}
				{/key}
			</Box>
		{/if}
		{#if author !== '' && selectedAuthor != null}
			<Box ch gap="var(--gap-m)" width="fit-content">
				<span class="select-tags">SPEAKER:</span>
				{#key author}
					<AuthorName disableRedirect mw author={selectedAuthor || ''} />
				{/key}
				<img
					src={deleteIcon}
					on:keyup={deleteSpeakerFromFilter}
					alt="delete"
					on:click={deleteSpeakerFromFilter}
				/>
			</Box>
		{/if}
		{#if dateFrom != null || dateTo != null}
			<Box ch gap="var(--gap-m)" width="fit-content">
				<span class="select-tags">TIMEFRAME:</span>
				<Tag text={getDayAndMonthJsDate(dateFrom)} />
				<span>-</span>
				<Tag text={getDayAndMonthJsDate(dateTo)} />
				<img
					src={deleteIcon}
					alt="delete"
					on:keyup={deleteSpeakerFromFilter}
					on:click={deleteDateFromFilter}
				/>
			</Box>
		{/if}
	</Box>

	{#if open}
		<MediaQuery query="(min-width: 1115px)" let:matches>
			{#if matches}
				<Filters
					bind:dateFrom
					bind:dateTo
					bind:selectedAuthor
					bind:author
					bind:boxRef
					{tags}
					{authors}
					tagClickEvent={addClickTagEvent}
					{initSelectTags}
				/>
			{:else}
				<Filters
					bind:dateFrom
					bind:dateTo
					bind:selectedAuthor
					bind:author
					bind:boxRef
					dc
					{tags}
					{authors}
					tagClickEvent={addClickTagEvent}
					{initSelectTags}
				/>
			{/if}
		</MediaQuery>
	{/if}
</Box>

<style>
	span {
		font-size: var(--font-m);
	}

	.select-tags {
		color: var(--grey-700);
	}
</style>
