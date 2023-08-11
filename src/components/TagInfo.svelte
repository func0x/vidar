<script>
	export let text;
	export let live = false;
	export let vna = false; // video not available
	export let fp = false; // timeframe (filder panel)
</script>

<span class:live class:vna class:fp>{text}</span>

<style>
	span {
		background-color: var(--aubergine);
		align-self: flex-start;
		font-size: var(--font-s);
		color: white;
		padding: 10px;
		text-transform: uppercase;
		border-radius: var(--border-radius-xl);
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.live {
		background-color: var(--red);
		color: var(--white);
	}

	.vna {
		background-color: var(--grey-700);
		position: absolute;
		left: 15px;
		top: 15px;
	}

	.fp {
		background-color: var(--grey-300);
		color: var(--aubergine);
	}

	@media screen and (max-width: 1114px) {
		span {
			position: absolute;
			left: 15px;
			top: 15px;
		}

		.fp {
			position: static;
		}
	}
</style>
