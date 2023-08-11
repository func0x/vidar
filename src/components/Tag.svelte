<script>
	export let text = '';
	export let redirect = false;
</script>

{#if !redirect}
	<span>{text}</span>
{:else}
	<a href="/">
		<span>{text}</span>
	</a>
{/if}

<style>
	span {
		font-size: var(--font-s);
		background-color: var(--grey-300);
		padding: var(--gap-s);
		max-height: 35px;
		border-radius: var(--border-radius-xl);
		display: inline-block;
		white-space: nowrap;
	}

	span:hover {
		background-color: var(--grey-700);
		color: var(--white);
		animation: change-recent-tag-bg-color-hover 0.75s;
	}
</style>
