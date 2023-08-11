<script>
	import { css } from '@emotion/css';

	export let icon = '';
	export let text = '';
	export let notFound = false;
	export let bg;
	export let border = 'unset';
	export let onClick = () => {};
	export let ref = null;

	let buttonCss = css`
		background-color: ${bg};
		border: ${border};
	`;
</script>

{#if notFound}
	<a class:notFound href="/">
		{text} <img src={icon} alt="icon" />
	</a>
{:else}
	<button class={buttonCss} bind:this={ref} on:click={onClick}
		><img src={icon} alt="icon" /> {text}</button
	>
{/if}

<style>
	button {
		padding: var(--gap-m);
		border-radius: var(--border-radius-xl);
		align-self: flex-end;
		color: var(--aubergine);
		text-transform: uppercase;
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
		display: flex;
		align-items: center;
		gap: var(--gap-xl);
		background-color: var(--aubergine);
	}
</style>
