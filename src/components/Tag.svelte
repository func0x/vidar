<script>
	import { css, keyframes } from '@emotion/css';
	import deleteIcon from '$lib/images/delete.svg';

	export let text = '';
	export let bg = 'var(--grey-300)';
	export let hbg = 'var(--grey-700)'; // tag hover bg color
	export let hc = 'var(--white)'; // hover color
	export let fs = 'var(--font-s)'; // font size
	export let ft = false; // delete tag from filters
	export let onDelete = () => {};

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
			background-color: ${hbg} !important;
			color: ${hc} !important;
			animation: ${changeTagColorHover} 0.75s;
		}
	`;
</script>

{#if ft}
	<span class={tagCss}>
		<div class:ft>
			<span>{text}</span>
			<img
				src={deleteIcon}
				on:click={() => onDelete(text)}
				on:keyup={() => onDelete(text)}
				alt="delete"
			/>
		</div>
	</span>
{:else}
	<span class={tagCss}>{text}</span>
{/if}

<style>
	span {
		padding: var(--gap-s);
		width: fit-content;
		max-height: 35px;
		border-radius: var(--border-radius-xl);
		display: flex;
		white-space: nowrap;
		cursor: pointer;
	}

	.ft {
		display: flex;
		gap: var(--gap-xs);
	}

	.ft > span {
		padding: 0;
	}

	.ft > img {
		align-self: center;
	}
</style>
