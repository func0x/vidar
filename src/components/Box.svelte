<script>
	import { css } from '@emotion/css';

	export let cvh = false; // center vertical and horizontal
	export let ch = false; // center horizontal
	export let jsb = false; // justify-content: space-between
	export let width = '100%';
	export let height = '100%';
	export let padding = 'var(--gap-l)';

	let boxCss = css`
		width: ${width};
		height: ${height};
		padding: 0 ${padding};
	`;
</script>

<div class:cvh class:ch class:jsb class={boxCss}>
	<slot />
</div>

<style>
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
</style>
