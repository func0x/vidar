<script>
	export let text = '';
	export let redirect = false;
	export let eventCard = false;
</script>

{#if !redirect}
	<span class:eventCard>{text}</span>
{:else}
	<a href="/">
		<span class:eventCard>{text}</span>
	</a>
{/if}

<style>
	span {
		font-size: var(--font-s);
		background-color: var(--white);
		padding: var(--gap-s);
		max-height: 35px;
		border-radius: var(--border-radius-xl);
		display: inline-block;
		white-space: nowrap;
	}

	span:hover {
		background-color: var(--grey-700);
		color: var(--white);
		animation: change-upcoming-tag-bg-color-hover 0.75s;
	}

	.eventCard {
		background-color: var(--grey-300);
	}

	.eventCard:hover {
		animation: change-upcoming-tag-bg-color-hover 0.75s;
	}
</style>
