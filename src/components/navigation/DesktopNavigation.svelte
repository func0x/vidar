<script>
	import Box from '../Box.svelte';
	import logo from '$lib/images/vidar.svg';
	import search from '$lib/images/search.svg';
	import UseMediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let query = '';

	const redirectToSearch = () => {
		goto(`/search/?query=${query}`);
	};
</script>

<Box border="2px solid var(--grey-300)" ch jsb height="70px" padding="0 var(--gap-l)">
	<a href="/">
		<img src={logo} alt="logo" />
	</a>
	<UseMediaQuery query="(min-width: 1115px)" let:matches>
		{#if matches && $page.url.pathname !== '/search/'}
			<form on:submit|preventDefault={redirectToSearch}>
				<input name="query" bind:value={query} placeholder="Search..." />
				<button type="submit"><img src={search} alt="search" /></button>
			</form>
		{/if}
	</UseMediaQuery>
</Box>

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
</style>
