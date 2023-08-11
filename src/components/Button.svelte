<script>
	import { css } from '@emotion/css';
	export let icon = '';
	export let text = '';
	export let bg;

	const buttonCss = css`
		background-color: ${bg};
	`;
</script>

<button class={buttonCss}><img src={icon} alt="icon" /> {text}</button>

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
	}
</style>
