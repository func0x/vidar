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
</script>

<div class:df class:cvh class:ch class:jsb class:je class:hover class={boxCss}>
	<slot />
</div>

<style>
	.df {
		display: flex;
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

	.hover:hover > :global(.multiple-speakers-list) {
		display: flex;
	}
</style>
