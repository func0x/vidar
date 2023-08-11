<script>
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import Select from './Select.svelte';
	import filter from '$lib/images/filter.svg';
	import filterWhite from '$lib/images/filter_white.svg';
	import Tag from './Tag.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { authorStore, dateRangeStore, dateTypeStore, selectedTagsStore } from 'src/stores/Data';
	import { getDayAndMonthJsDate, jsDateToLuxonTimestamp } from 'src/utils/date';
	import deleteIcon from '$lib/images/delete.svg';
	import AuthorName from './AuthorName.svelte';
	import Filters from './Filters.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import TagPanel from './TagPanel.svelte';
	import TagInfo from './TagInfo.svelte';

	export let tags;
	export let authors;
	export let query;
	export let count;
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
	let period = JSON.parse($page.url.searchParams.get('period')) || 'Any Time';
	let selectedAuthor = findAuthorByName(author);

	const initSelectTags = () => {
		Object.entries(boxRef.children ? boxRef.children : []).forEach(([_, value]) => {
			if (new Set(JSON.parse($page.url.searchParams.get('tags'))).has(value.textContent)) {
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
		$selectedTagsStore = $selectedTagsStore.filter((x) => x !== tagName);

		$page.url.searchParams.set('tags', JSON.stringify(Array.from(selectedTags)));
		goto(`?${$page.url.searchParams.toString()}`, {
			noScroll: true,
			replaceState: true
		});
		initSelectTags();
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

		$dateTypeStore = 'Any Time';

		$page.url.searchParams.set('date', JSON.stringify({ from: dateFrom, to: dateTo }));
		$page.url.searchParams.set('period', JSON.stringify('Any Time'));
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
	};

	onMount(() => {
		$selectedTagsStore = Array.from(selectedTags);
		dateRangeStore.set({
			from: jsDateToLuxonTimestamp(dateFrom, 'from'),
			to: jsDateToLuxonTimestamp(dateTo, 'to')
		});
		$dateTypeStore = period;
		$authorStore = selectedAuthor?.name ? selectedAuthor.name : '';

		const subscribtion = dateRangeStore.subscribe(() => {
			if (dateFrom || dateTo) {
				$page.url.searchParams.set('date', JSON.stringify({ from: dateFrom, to: dateTo }));
				goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
			}
		});

		return () => {
			subscribtion();
		};
	});
</script>

<MediaQuery query="(min-width: 1750px)" let:matches>
	{#if matches}
		<Box df fd="column" padding="0 var(--gap-l) var(--gap-l) var(--gap-l)" gap="var(--gap-m)">
			<Box cvh jsb gap="var(--gap-m)">
				<Box width="fit-content" cvh gap="var(--gap-s)">
					<span>Sort by:</span>
					<Select {options} />
				</Box>
				<Box df tac fd="column" width="fit-content">
					<span class="query">{query}</span>
					<span class="results">{count === 0 ? 'no' : count} results found</span>
				</Box>
				<Button
					icon={filter}
					bind:ref={buttonRef}
					onClick={onFiltersButtonClick}
					text="Filters"
					bg="var(--white)"
					border="1px solid var(--grey-500)"
				/>
			</Box>

			<Box df fw gap="var(--gap-l)">
				{#if $selectedTagsStore.length > 0}
					<Box ch gap="var(--gap-m)" width="fit-content">
						<span class="select-tags">TAGS:</span>
						<Box
							bg="transparent"
							mw="calc(100vw - 120px)"
							df
							gap="var(--gap-s)"
							fd="column"
							height="fit-content"
						>
							{#key $selectedTagsStore}
								<TagPanel>
									{#each $selectedTagsStore as tag (tag)}
										<Tag ft text={tag} onDelete={deleteTagFromFilter} />
									{/each}
								</TagPanel>
							{/key}
						</Box>
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
				<Box ch gap="var(--gap-m)" width="fit-content">
					{#if $dateTypeStore === 'Last 30 days' || $dateTypeStore === 'Last 3 months'}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo text={$dateTypeStore} fp />
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}

					{#if ($dateTypeStore === 'On' || $dateTypeStore === 'Before' || $dateTypeStore === 'After') && dateFrom}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo text={`${$dateTypeStore} ${getDayAndMonthJsDate(dateFrom)}`} fp />
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}

					{#if $dateTypeStore === 'Range' && dateTo}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo
							text={`${$dateTypeStore} ${getDayAndMonthJsDate(dateFrom)} - ${getDayAndMonthJsDate(
								dateTo
							)}`}
							fp
						/>
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}
				</Box>
			</Box>

			{#if open}
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
			{/if}
		</Box>
	{:else}
		<Box df fd="column" padding="0 var(--gap-m) var(--gap-m) var(--gap-m)" gap="var(--gap-s)">
			<Box df tac fd="column">
				<span class="query">{query}</span>
				<span class="results">{count === 0 ? 'no' : count} results found</span>
			</Box>
			<Box cvh jsb gap="var(--gap-m)">
				<Box width="fit-content" cvh gap="var(--gap-s)">
					<span>Sort by:</span>
					<Select {options} />
				</Box>
				<Button
					icon={filter}
					bind:ref={buttonRef}
					onClick={onFiltersButtonClick}
					text="Filters"
					bg="var(--white)"
					border="1px solid var(--grey-500)"
				/>
			</Box>

			<Box df fd="column" gap="var(--gap-m)">
				{#if $selectedTagsStore.length > 0}
					<Box ch gap="var(--gap-m)" width="fit-content">
						<span class="select-tags">TAGS:</span>
						<Box
							bg="transparent"
							mw="calc(100vw - 90px)"
							df
							gap="var(--gap-s)"
							fd="column"
							height="fit-content"
						>
							{#key $selectedTagsStore}
								<TagPanel>
									{#each $selectedTagsStore as tag (tag)}
										<Tag ft text={tag} onDelete={deleteTagFromFilter} />
									{/each}
								</TagPanel>
							{/key}
						</Box>
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
				<Box ch gap="var(--gap-m)" width="fit-content">
					{#if $dateTypeStore === 'Last 30 days' || $dateTypeStore === 'Last 3 months'}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo text={$dateTypeStore} fp />
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}

					{#if ($dateTypeStore === 'On' || $dateTypeStore === 'Before' || $dateTypeStore === 'After') && dateFrom}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo text={`${$dateTypeStore} ${getDayAndMonthJsDate(dateFrom)}`} fp />
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}

					{#if $dateTypeStore === 'Range' && dateTo}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo
							text={`${$dateTypeStore} ${getDayAndMonthJsDate(dateFrom)} - ${getDayAndMonthJsDate(
								dateTo
							)}`}
							fp
						/>
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}
				</Box>
			</Box>

			{#if open}
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
		</Box>
	{/if}
</MediaQuery>

<style>
	.query {
		font-size: 32px;
		font-weight: var(--font-bold);
	}

	.results {
		font-size: 16px;
		color: var(--grey-700);
	}

	.select-tags {
		color: var(--grey-700);
	}

	img {
		cursor: pointer;
	}
</style>
