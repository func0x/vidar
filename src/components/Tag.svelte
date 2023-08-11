<script>
	import { css, keyframes } from '@emotion/css';
	export let text = '';
	export let redirect = false;
	export let bg; // background-color
	export let hbg; // hover bg
	export let hc; // hover color
	export let fs; // font size

	const changeTagColorHover = keyframes`
		from {
			background-color: ${bg};
		}

		to {
			background-color: ${hbg};
		}
`;

	const tagCss = css`
		background-color: ${bg};
		font-size: ${fs};

		&:hover {
			background-color: ${hbg};
			color: ${hc};
			animation: ${changeTagColorHover} 0.75s;
		}
	`;
</script>

{#if !redirect}
	<span class={tagCss}>{text}</span>
{:else}
	<a href="/">
		<span>{text}</span>
	</a>
{/if}

<style>
	span {
		padding: var(--gap-s);
		max-height: 35px;
		border-radius: var(--border-radius-xl);
		display: inline-block;
		white-space: nowrap;
	}
</style>
