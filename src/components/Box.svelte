<script>
	import { css } from '@emotion/css';

	export let cvh = false; // center vertical and horizontal
	export let ch = false; // center horizontal
	export let jsb = false; // justify-content: space-between
	export let width = '100%';
	export let height = '100%';
	export let padding = 'unset';
	export let bg = 'var(--white)';
	export let mw = 'unset'; // max-width: unset
	export let gap = 'unset';
	export let fd = 'row';
	export let je = false; // justify-content: end
	export let position = 'static';
	export let top = 'unset';
	export let left = 'unset';
	export let df = false; // display: flex
	export let hover = false; // on container hover efect
	export let ds = false; // disable display scroll
	export let di = false; // display: inherit
	export let tp = false; // TagPanel component box
	export let la = false; // left tag panel arrow
	export let ra = false; // right tag panel arrow
	export let boxRef = null;

	let boxCss = css`
		width: ${width};
		max-width: ${mw};
		height: ${height};
		padding: ${padding};
		background-color: ${bg};
		gap: ${gap};
		flex-direction: ${fd};
		position: ${position};
		top: ${top};
		left: ${left};
	`;

	let filterPanelCss = css`
		display: flex;
		gap: var(--gap-s);
	`;
</script>

{#if tp || la || ra}
	<div bind:this={boxRef} class={filterPanelCss} class:la class:ra class:ds>
		<slot />
	</div>
{:else}
	<div
		class:ds
		class:di
		class:df
		class:cvh
		class:ch
		class:jsb
		class:je
		class:hover
		class:tp
		class:la
		class:ra
		class={boxCss}
	>
		<slot />
	</div>
{/if}

<style>
	.df {
		display: flex;
	}

	.di {
		display: inherit;
	}

	.cvh {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.ch {
		display: flex;
		align-items: center;
	}

	.jsb {
		justify-content: space-between;
	}

	.je {
		justify-content: end;
	}

	.ds {
		position: relative;
		-ms-overflow-style: none;
		scrollbar-width: none;
		overflow-y: hidden;
	}

	.ds::-webkit-scrollbar {
		display: none;
	}

	.hover:hover > :global(.multiple-speakers-list) {
		display: flex;
	}

	.la {
		align-items: center;
		background: linear-gradient(to right, rgb(255, 255, 255) 25%, rgba(255, 255, 255, 0) 100%);
		cursor: pointer;
		display: flex;
		height: 35px;
		position: absolute;
		top: 0px;
		width: 35px;
		left: 0px;
		justify-content: flex-start;
		text-align: right;
	}

	.ra {
		align-items: center;
		background: linear-gradient(to left, rgb(255, 255, 255) 25%, rgba(255, 255, 255, 0) 100%);
		cursor: pointer;
		display: flex;
		height: 35px;
		position: absolute;
		top: 0px;
		width: 35px;
		right: 0px;
		justify-content: flex-end;
		text-align: right;
	}
</style>
