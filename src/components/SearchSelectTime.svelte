<script>
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';

	import { searchedDateTypeStore, searchedSortDirectionStore } from 'src/stores/SearchData';

	import { onMount } from 'svelte';
	import { searchedDateRangeStore } from '../stores/SearchData';
	import Box from './Box.svelte';

	export let options;

	export let selected = options.some((t) => t === $searchedDateTypeStore)
		? $searchedDateTypeStore
		: ($searchedDateTypeStore = 'Any Time');
	let optionsContainer;

	const changeSelectedOption = (options, value) => {
		options.forEach((element) => {
			if (element.textContent !== value) {
				element.style.color = 'var(--aubergine)';
			} else {
				element.style.color = 'var(--red)';
			}
		});

		$searchedDateTypeStore = value;

		if ($searchedDateTypeStore === 'Any Time') {
			$searchedDateRangeStore = { start_date: null, end_date: null };
			$page.url.searchParams.delete('date');
		}

		$page.url.searchParams.set('period', JSON.stringify(value));
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
	};

	onMount(() => {
		changeSelectedOption(optionsContainer.childNodes, $searchedDateTypeStore);
	});

	const changeSelected = (event) => {
		const name = event.target.getAttribute('name');
		selected = name;
		searchedSortDirectionStore.set(name);
		changeSelectedOption(optionsContainer.childNodes, selected);
	};
</script>

<Box width="fit-content" df fd="column" gap="var(--gap-xs)" position="relative">
	<span>Date</span>
	<div class="dropdown-wrapper">
		<div class="dropdown">
			{selected}
		</div>
		<div bind:this={optionsContainer} class="dropdown-content">
			{#each options as option}
				<div on:keyup={changeSelected} on:click={changeSelected} name={option}>{option}</div>
			{/each}
		</div>
	</div>
</Box>

<style>
	.dropdown {
		border: 1px solid rgba(103, 113, 137, 0.3);
		border-radius: var(--border-radius);
		height: 50px;
		width: 140px;
		display: flex;
		align-items: center;
		padding: 12px 16px;
		font-size: var(--font-m);
		color: var(--aubergine);
		background-image: url(../lib/images/down_arrow.svg);
		background-repeat: no-repeat;
		background-position-x: 90%;
		background-position-y: 52%;
	}

	.dropdown-wrapper {
		position: relative;
		display: inline-block;
	}

	.dropdown-content {
		animation: dropdown-fade-in 0.35s;
		display: none;
		position: absolute;
		border: 1px solid rgba(103, 113, 137, 0.3);
		background-color: var(--white);
		border-radius: var(--border-radius);
		width: 140px;
		z-index: 1;
	}

	.dropdown-content div {
		color: var(--aubergine);
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		cursor: pointer;
	}

	.dropdown-content div:hover {
		background-color: var(--grey-300);
	}

	.dropdown-wrapper:hover .dropdown-content {
		display: block;
	}

	.dropdown-content > div:first-child {
		color: var(--red);
	}

	span {
		font-size: var(--font-m);
		color: var(--aubergine);
	}
</style>
