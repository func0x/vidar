<script>
	import Box from '../Box.svelte';
	import logo from '$lib/images/vidar.svg';
	import UseMediaQuery from 'src/hooks/UseMediaQuery.svelte';
</script>

<Box border="2px solid var(--grey-300)" ch jsb height="70px" padding="0 var(--gap-l)">
	<a href="/">
		<img src={logo} alt="logo" />
	</a>
	<UseMediaQuery query="(min-width: 1115px)" let:matches>
		{#if matches}
			<input placeholder="Search..." />
		{/if}
	</UseMediaQuery>
</Box>

<style>
	input {
		background: url(../../lib/images/search.svg) no-repeat scroll 20px 16px;
		background-color: var(--grey-300);
		width: 400px;
		height: 50px;
		border-radius: var(--border-radius-xxl);
		padding-left: var(--gap-xl);
		font-size: var(--font-m);
	}
</style>
