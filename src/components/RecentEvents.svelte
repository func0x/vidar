<script>
	import Event from 'src/components/Event.svelte';

	export let events;
</script>

<div class="exlore-container">
	{#each events as event (event.title)} <Event {event} /> {/each}
</div>

<style>
	.exlore-container {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-column-gap: var(--gap-xl);
		grid-row-gap: var(--gap-l);
		padding: 0 var(--gap-l);
	}

	@media screen and (min-width: 2300px) and (max-width: 3840px) {
		.exlore-container {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}

	@media screen and (min-width: 1115px) and (max-width: 1750px) {
		.exlore-container {
			grid-template-columns: repeat(1, minmax(0, 1fr));
			grid-column-gap: unset;
			padding: 0 var(--gap-m);
		}
	}

	@media screen and (min-width: 700px) and (max-width: 1115px) {
		.exlore-container {
			grid-template-columns: repeat(1, minmax(0, 1fr));
			grid-column-gap: var(--gap-l);
			grid-row-gap: var(--gap-m);
			padding: unset;
		}
	}

	@media screen and (max-width: 700px) {
		.exlore-container {
			grid-template-columns: unset;
			grid-column-gap: unset;
			grid-row-gap: 15px;
			padding: unset;
		}
	}
</style>
