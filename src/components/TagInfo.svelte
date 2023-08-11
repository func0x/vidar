<script>
	import { css, keyframes } from '@emotion/css';
	import { page } from '$app/stores';
	import { dateRangeStore, dateTypeStore } from '../stores/Data';
	import deleteIcon from '$lib/images/delete.svg';
	import { goto } from '$app/navigation';
	import { searchedDateRangeStore, searchedDateTypeStore } from '../stores/SearchData';

	export let text;
	export let live = false;
	export let vna = false; // video not available
	export let fp = false; // timeframe (filder panel)
	export let featured = false; // STREAMED ... DAYS AGO
	export let ml = false; // margin left
	export let color = 'var(--aubergine)';
	export let bg = 'var(--grey-300)';
	export const hbg = 'var(--tag-hover)'; // tag hover bg color
	export const hc = 'var(--tag-font-color)'; // hover color

	const deleteDateFromFilter = () => {

		if ($page.url.pathname !== '/search/') {
			$dateRangeStore = { start_date: null, end_date: null };

			$dateTypeStore = 'Any Time';
		} else {
			$searchedDateRangeStore = { start_date: null, end_date: null };

			$searchedDateTypeStore = 'Any Time';
		}

		$page.url.searchParams.delete('date');
		$page.url.searchParams.set('period', JSON.stringify('Any Time'));
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
	};

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
		color: ${color};
		&:hover {
			background-color: ${hbg} !important;
			color: ${hc} !important;
			animation: ${changeTagColorHover} 0.75s;
		}

		&:hover > span {
			background-color: ${hbg} !important;
		}
	`;
</script>

{#if fp}
	<div class={`wrapper ${tagCss}`} on:keyup={deleteDateFromFilter} on:click={deleteDateFromFilter}>
		<span class:live class:featured class:vna class:ml>{text}</span>
		<img
			src={deleteIcon}
			alt="delete"
			on:keyup={deleteDateFromFilter}
			on:click={deleteDateFromFilter}
		/>
	</div>
{:else}
	<span class:live class:featured class:vna class:ml class:fp>{text}</span>
{/if}

<style>
	span {
		background-color: var(--grey-300);
		align-self: flex-start;
		font-size: var(--font-s);
		color: var(--aubergine);
		gap: var(--gap-s);
		padding: var(--gap-s);
		text-transform: uppercase;
		border-radius: var(--border-radius-xl);
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.wrapper {
		display: flex;
		align-items: center;
		gap: var(--gap-s);
		background-color: var(--aubergine);
		color: var(--white);
		padding: var(--gap-s);
		border-radius: var(--border-radius-xl);
		cursor: pointer;
	}

	.wrapper > span {
		background-color: var(--aubergine);
		color: var(--white);
		padding: unset;
	}

	.ml {
		margin-left: 5px;
	}

	.live {
		background-color: var(--red);
		color: var(--white);
	}

	.vna {
		background-color: var(--grey-300);
		position: absolute;
		left: 15px;
		top: 15px;
	}

	.fp {
		background-color: var(--aubergine);
		color: var(--white);
	}

	@media screen and (max-width: 1114px) {
		span {
			left: 15px;
			top: 15px;
		}

		.fp {
			position: static;
		}

		.featured {
			position: initial;
			margin: 25px 0 0 15px;
		}
	}
</style>
