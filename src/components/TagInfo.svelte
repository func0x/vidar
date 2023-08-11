<script>
	export let text;
	export let live = false;
	export let vna = false; // video not available
</script>

<span class:live class:vna>{text}</span>

<style>
	span {
		background-color: var(--aubergine);
		align-self: flex-start;
		font-size: var(--font-s);
		color: white;
		padding: 10px;
		text-transform: uppercase;
		border-radius: var(--border-radius-xl);
	}

	.vna {
		background-color: var(--grey-700);
		position: absolute;
		left: 15px;
		top: 15px;
	}

	@media screen and (max-width: 1115px) {
		span {
			position: absolute;
			left: 15px;
			top: 15px;
		}
	}
</style>
