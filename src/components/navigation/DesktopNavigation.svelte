<script>
	import Box from '../Box.svelte';
	import logo from '$lib/images/vidar.svg';
	import search from '$lib/images/search.svg';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import UseMediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import { authorStore, dateRangeStore, dateTypeStore, selectedTagsStore } from '../../stores/Data';

	let query = '';

	const redirectToSearch = () => {
		goto(`/search/?query=${query}`);
	};

	const goToClearHome = () => {
		$selectedTagsStore = [];
		$dateRangeStore = { start_date: null, end_date: null };
		$authorStore = '';
		$dateTypeStore = 'Any Time';
		query = '';
		goto('/', { noScroll: true, replaceState: true, invalidateAll: true });
	};
</script>

<UseMediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches}
		<Box border="2px solid var(--grey-300)" ch jsb height="70px" padding="0 var(--gap-l)">
			<img on:click={goToClearHome} on:keyup={goToClearHome} src={logo} alt="logo" />
			{#if $page.url.pathname !== '/search/'}
				<form on:submit|preventDefault={redirectToSearch}>
					<input name="query" bind:value={query} placeholder="Search..." />
					<button type="submit"><img src={search} alt="search" /></button>
				</form>
			{/if}
		</Box>
	{:else}
		<Box border="2px solid var(--grey-300)" ch jsb height="70px" padding="0 var(--gap-m)">
			<a href="/">
				<img src={logo} alt="logo" />
			</a>
			{#if $page.url.pathname !== '/search/'}
				<form on:submit|preventDefault={redirectToSearch}>
					<input name="query" bind:value={query} placeholder="Search..." />
					<button type="submit"><img src={search} alt="search" /></button>
				</form>
			{/if}
		</Box>
	{/if}
</UseMediaQuery>

<style>
	input {
		width: 340px;
		height: 50px;
		background-color: var(--grey-300);
		padding-left: var(--gap-m);
		font-size: var(--font-m);
	}

	button {
		width: 60px;
		background-color: var(--grey-300);
		border: none;
		cursor: pointer;
	}

	form {
		display: flex;
		border-radius: var(--border-radius-xxl);
		overflow: hidden;
	}

	img {
		cursor: pointer;
	}

	@media screen and (max-width: 700px) {
		input {
			width: 240px;
		}

		button {
			width: 45px;
		}
	}

	@media screen and (max-width: 460px) {
		input {
			width: 170px;
		}

		button {
			width: 40px;
		}
	}
</style>
