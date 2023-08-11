<script>
	import { css } from '@emotion/css';
	export let icon = '';
	export let text = '';
	export let notFound = false;
	export let bg;

	const buttonCss = css`
		background-color: ${bg};
	`;
</script>

{#if notFound}
	<a href="/">
		<button class:notFound class={buttonCss}>{text} <img src={icon} alt="icon" /></button>
	</a>
{:else}
	<button class={buttonCss}><img src={icon} alt="icon" /> {text}</button>
{/if}

<style>
	button {
		border: unset;
		padding: var(--gap-m);
		border-radius: var(--border-radius-xl);
		align-self: flex-end;
		color: var(--aubergine);
		text-transform: uppercase;
		font-weight: var(--font-bold);
		display: flex;
		align-items: center;
		gap: var(--gap-m);
		cursor: pointer;
		font-size: var(--font-m);
	}

	.notFound {
		align-self: center;
		color: var(--white);
		border-radius: 2000px;
		padding: var(--gap-l);
		gap: var(--gap-xl);
	}
</style>
