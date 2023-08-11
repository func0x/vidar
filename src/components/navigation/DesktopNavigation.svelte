<script>
	import Box from '../Box.svelte';
	import logo from '$lib/images/vidar.svg';
	import search from '$lib/images/search.svg';
</script>

<Box ch jsb height="70px" padding="0 var(--gap-l)">
	<a href="/">
		<img src={logo} alt="logo" />
	</a>
	<div>
		<input />
		<button><img class="search-icon" src={search} alt="search" /></button>
	</div>
</Box>

<style>
	div {
		background-color: var(--grey-300);
		border-radius: var(--border-radius);
		height: 40px;
		display: flex;
		top: 0;
	}
	input {
		border: none;
		background-color: var(--grey-300);
		width: 400px;
		height: 40px;
		border-radius: var(--border-radius);
		padding-left: var(--gap-s);
		font-size: var(--font-m);
	}

	input:focus {
		outline: none;
	}

	button {
		border: none;
		padding: unset;
		background-color: var(--grey-300);
		width: 40px;
		height: 40px;
		border-radius: var(--border-radius);
		position: relative;
		cursor: pointer;
	}

	.search-icon {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}
</style>
