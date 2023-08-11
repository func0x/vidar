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
	import {
		authorStore,
		dateRangeStore,
		dateTypeStore,
		eventsStore,
		selectedTagsStore
	} from 'src/stores/Data';
	import { getDayAndMonthJsDate, jsDateToLuxonTimestamp } from 'src/utils/date';
	import deleteIcon from '$lib/images/delete.svg';
	import AuthorName from './AuthorName.svelte';
	import Filters from './Filters.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import TagPanel from './TagPanel.svelte';
	import TagInfo from './TagInfo.svelte';

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
			: new Date($eventsStore.reduce((x, y) => (x.datetime > y.datetime ? y : x)).datetime * 1000);
	let dateTo =
		JSON.parse($page.url.searchParams.get('date'))?.to != null
			? new Date(JSON.parse($page.url.searchParams.get('date')).to)
			: new Date(Date.now());
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
		// params = params.filter((x) => x !== tagName);
		// selectedTagsStore.set(params);
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
			$page.url.searchParams.set('date', JSON.stringify({ from: dateFrom, to: dateTo }));
			goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
		});

		return () => {
			subscribtion();
		};
	});
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

	<MediaQuery query="(min-width: 1115px)" let:matches>
		{#if matches}
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
							<TagPanel>
								{#each $selectedTagsStore as tag (tag)}
									<Tag ft text={tag} onDelete={deleteTagFromFilter} />
								{/each}
							</TagPanel>
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
		{:else}
			<Box df fd="column" gap="var(--gap-m)">
				{#if params.length > 0}
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
							{#key params}
								<TagPanel>
									{#each params as tag (tag)}
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
		{/if}
	</MediaQuery>

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
