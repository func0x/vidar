<script>
	export let title;
</script>

<h1>{title}</h1>

<style>
	h1 {
		font-size: var(--font-l);
		font-weight: var(--font-bold);
		margin: var(--gap-m) var(--gap-l);
	}

	@media screen and (max-width: 1749px) {
		h1 {
			margin: var(--gap-m);
		}
	}
</style>
