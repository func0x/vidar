<script>
	import { css } from '@emotion/css';

	export let icon = '';
	export let text = '';
	export let notFound = false;
	export let bg;
	export let border = 'unset';
	export let onClick = () => {};
	export let ref = null;
	export let href = '';

	let buttonCss = css`
		background-color: ${bg};
		border: ${border};

		&:hover {
			background-color: var(--grey-700) !important;
			color: var(--white) !important;
		}
	`;

	let linkCss = css`
		align-self: ${text === 'Watch Live' ? 'flex-end' : 'flex-start'};
	`;
</script>

{#if notFound}
	<a class:notFound href="/">
		{text} <img src={icon} alt="icon" />
	</a>
{:else if href === ''}
	<button class={buttonCss} bind:this={ref} on:click={onClick}
		><img src={icon} alt="icon" /> {text}</button
	>
{:else}
	<a {href} class={linkCss} target="_blank" rel="noopener noreferrer">
		<button class={buttonCss} bind:this={ref} on:click={onClick}
			><img src={icon} alt="icon" /> {text}</button
		>
	</a>
{/if}

<style>
	button {
		width: fit-content;
		padding: var(--gap-m);
		border-radius: var(--border-radius-xl);
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
