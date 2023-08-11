<script>
	import { css, keyframes } from '@emotion/css';
	import deleteIcon from '$lib/images/delete.svg';
	import { selectedTagsStore } from 'src/stores/Data';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

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

	const onTagClick = () => {
		selectedTagsStore.update((v) => {
			return Array.from(new Set([...v, text]));
		});

		$page.url.searchParams.set('tags', JSON.stringify($selectedTagsStore));
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
	};
</script>

{#if ft}
	<span class={tagCss}>
		<div class:ft>
			<span on:click={() => onDelete(text)} on:keyup={() => onDelete(text)}>{text}</span>
			<img
				src={deleteIcon}
				on:click={() => onDelete(text)}
				on:keyup={() => onDelete(text)}
				alt="delete"
			/>
		</div>
	</span>
{:else}
	<span on:click={onTagClick} on:keyup={onTagClick} class={tagCss}>{text}</span>
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
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
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
