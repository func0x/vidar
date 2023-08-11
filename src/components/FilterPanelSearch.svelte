<script>
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import filter from '$lib/images/filter.svg';
	import filterWhite from '$lib/images/filter_white.svg';
	import SelectTag from './SelectTag.svelte';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { getDayAndMonthJsDate, jsDateToLuxonTimestamp } from 'src/utils/date';
	import deleteIcon from '$lib/images/delete.svg';
	import AuthorName from './AuthorName.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import TagPanel from './TagPanel.svelte';
	import {
		searchedAuthorStore,
		searchedDateRangeStore,
		searchedDateTypeStore,
		searchedSelectedTagsStore
	} from 'src/stores/SearchData';
	import SearchFilters from './SearchFilters.svelte';
	import SearchSelect from './SearchSelect.svelte';

	export let tags;
	export let authors;
	export let query;
	export let count;
	const options = ['Latest', 'Earliest'];

	function findAuthorByName(authorName) {
		if (authors && authorName) {
			return authors.find((item) => {
				return item.name === authorName;
			});
		}
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
	let selectedTags;
	let author = JSON.parse($page.url.searchParams.get('speaker')) || '';
	let period = JSON.parse($page.url.searchParams.get('period')) || 'Any Time';
	let selectedAuthor = findAuthorByName(author);

	const initSelectTags = () => {
		Object.entries(boxRef.children ? boxRef.children : []).forEach(([_, value]) => {
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
				if (new Set(JSON.parse($page.url.searchParams.get('tags'))).has(value.textContent)) {
					selectedTags.delete(value.textContent);
					$searchedSelectedTagsStore = $searchedSelectedTagsStore.filter(
						(x) => x !== value.textContent
					);
				} else {
					selectedTags.add(value.textContent);
					$searchedSelectedTagsStore = [...$searchedSelectedTagsStore, value.innerText];
				}

				$page.url.searchParams.set('tags', JSON.stringify($searchedSelectedTagsStore));
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
		$searchedSelectedTagsStore = $searchedSelectedTagsStore.filter((x) => x !== tagName);

		if ($searchedSelectedTagsStore.length > 0) {
			$page.url.searchParams.set('tags', JSON.stringify(Array.from(selectedTags)));
		} else {
			$page.url.searchParams.delete('tags');
		}

		goto(`?${$page.url.searchParams.toString()}`, {
			noScroll: true,
			replaceState: true
		});
		initSelectTags();
	};

	const deleteSpeakerFromFilter = () => {
		author = '';
		$searchedAuthorStore = '';
		selectedAuthor = null;
		$page.url.searchParams.delete('speaker');
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
	};

	const deleteDateFromFilter = () => {
		dateFrom = null;
		dateTo = null;

		$searchedDateRangeStore = { from: null, to: null };

		$searchedDateTypeStore = 'Any Time';

		$page.url.searchParams.delete('date');
		$page.url.searchParams.set('period', JSON.stringify('Any Time'));
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
	};

	onMount(() => {
		if ($page.url.searchParams?.get('tags') && Array.isArray($page.url.searchParams?.get('tags'))) {
			if (JSON.parse($page.url.searchParams.get('tags')).every((i) => typeof i === 'string')) {
				selectedTags = new Set(JSON.parse($page.url.searchParams.get('tags')));
			}
		} else {
			selectedTags = new Set();
		}
		$searchedSelectedTagsStore = Array.from(selectedTags);
		$searchedDateTypeStore = period;
		$searchedAuthorStore = selectedAuthor?.name ? selectedAuthor.name : '';

		const subscribtion = searchedDateRangeStore.subscribe(() => {
			if ($searchedDateRangeStore.from || $searchedDateRangeStore.to) {
				$page.url.searchParams.set(
					'date',
					JSON.stringify({ from: $searchedDateRangeStore.from, to: $searchedDateRangeStore.to })
				);
				goto(`?${$page.url.searchParams.toString()}`, {
					noScroll: true,
					replaceState: true,
					keepFocus: true
				});
			}
		});

		return () => {
			subscribtion();
		};
	});
</script>

<MediaQuery query="(min-width: 1750px)" let:matches>
	{#if matches}
		<Box
			df
			fd="column"
			padding="0 var(--gap-l) var(--gap-l) var(--gap-l)"
			gap="var(--gap-m)"
			height="fit-content"
		>
			<Box cvh jsb gap="var(--gap-m)">
				<Box width="fit-content" cvh gap="var(--gap-s)">
					<span>Sort by:</span>
					<SearchSelect {options} />
				</Box>
				<Box df tac fd="column"  width="fit-content">
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
				{#if $searchedSelectedTagsStore.length > 0}
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
							{#key $searchedSelectedTagsStore}
								<TagPanel>
									{#each $searchedSelectedTagsStore as tag (tag)}
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
					{#if $searchedDateTypeStore === 'Last 30 days' || $searchedDateTypeStore === 'Last 3 months'}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo text={$searchedDateTypeStore} fp />
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}

					{#if ($searchedDateTypeStore === 'On' || $searchedDateTypeStore === 'Before' || $searchedDateTypeStore === 'After') && $searchedDateRangeStore.from}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo
							text={`${$searchedDateTypeStore} ${getDayAndMonthJsDate(
								$searchedDateRangeStore.from
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

					{#if $searchedDateTypeStore === 'Range' && dateTo}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo
							text={`${$searchedDateTypeStore} ${getDayAndMonthJsDate(
								dateFrom
							)} - ${getDayAndMonthJsDate(dateTo)}`}
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
				{#key $searchedSelectedTagsStore}
					<SearchFilters
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
				{/key}
			{/if}
		</Box>
	{:else}
		<Box
			df
			fd="column"
			padding="0 var(--gap-m) var(--gap-m) var(--gap-m)"
			gap="var(--gap-s)"
			height="fit-content"
		>
			<Box df tac fd="column">
				<span class="query">{query}</span>
				<span class="results">{count === 0 ? 'no' : count} results found</span>
			</Box>
			<Box cvh jsb gap="var(--gap-m)">
				<Box width="fit-content" cvh gap="var(--gap-s)">
					<span>Sort by:</span>
					<SearchSelect {options} />
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
				{#if $searchedSelectedTagsStore.length > 0}
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
							{#key $searchedSelectedTagsStore}
								<TagPanel>
									{#each $searchedSelectedTagsStore as tag (tag)}
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
					{#if $searchedDateTypeStore === 'Last 30 days' || $searchedDateTypeStore === 'Last 3 months'}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo text={$searchedDateTypeStore} fp />
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}

					{#if ($searchedDateTypeStore === 'On' || $searchedDateTypeStore === 'Before' || $searchedDateTypeStore === 'After') && dateFrom}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo text={`${$searchedDateTypeStore} ${getDayAndMonthJsDate(dateFrom)}`} fp />
						<img
							src={deleteIcon}
							alt="delete"
							on:keyup={deleteSpeakerFromFilter}
							on:click={deleteDateFromFilter}
						/>
					{/if}

					{#if $searchedDateTypeStore === 'Range' && dateTo}
						<span class="select-tags">TIMEFRAME:</span>
						<TagInfo
							text={`${$searchedDateTypeStore} ${getDayAndMonthJsDate(
								dateFrom
							)} - ${getDayAndMonthJsDate(dateTo)}`}
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
				{#key $searchedSelectedTagsStore}
					<SearchFilters
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
				{/key}
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
