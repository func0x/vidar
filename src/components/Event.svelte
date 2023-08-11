<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import EventDetails from './EventDetails.svelte';
	import Upcoming from './Upcoming.svelte';

	export let event;
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches}
		<div class="container">
			<img src={event.event_photo} alt="event" />
			<EventDetails eventCard {event} />
		</div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 1115px)" let:matches>
	{#if matches}
		<Upcoming {event} />
	{/if}
</MediaQuery>

<style>
	img {
		height: 190px;
		border-radius: var(--border-radius);
	}

	.container {
		display: grid;
		width: 100%;
		grid-template-columns: 340px 1fr;
		grid-column-gap: var(--gap-m);
		grid-row-gap: var(--gap-m);
	}
</style>
