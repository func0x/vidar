<script>
	import Event from 'src/components/Event.svelte';

	export let events;
	export let hover = false;
	export let exploreSimilar = false;
</script>

<div class="exlore-container">
	{#each events as event (event.title)} <Event {hover} {exploreSimilar} {event} /> {/each}
</div>

<style>
	.exlore-container {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-column-gap: var(--gap-xl);
		grid-row-gap: var(--gap-l);
		padding: 0 var(--gap-l) var(--gap-l) var(--gap-l);
	}

	@media screen and (min-width: 2650px) {
		.exlore-container {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media screen and (min-width: 1115px) and (max-width: 1749px) {
		.exlore-container {
			grid-template-columns: repeat(1, minmax(0, 1fr));
			grid-column-gap: unset;
			padding: 0 var(--gap-m) var(--gap-m) var(--gap-m);
		}
	}

	@media screen and (min-width: 700px) and (max-width: 1114px) {
		.exlore-container {
			grid-template-columns: repeat(1, minmax(0, 1fr));
			grid-column-gap: var(--gap-l);
			grid-row-gap: var(--gap-m);
			padding: 0 0 var(--gap-m) 0;
		}
	}

	@media screen and (max-width: 699px) {
		.exlore-container {
			grid-template-columns: unset;
			grid-column-gap: unset;
			grid-row-gap: 15px;
			padding: 0 0 var(--gap-m) 0;
		}
	}
</style>
