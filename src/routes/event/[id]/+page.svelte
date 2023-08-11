<script>
	import EventDetails from 'src/components/EventDetails.svelte';
	import Player from 'src/components/player/Player.svelte';

	export let data;

	const { event } = data;
</script>

<Player />
<EventDetails eventCard videoFooter {event} />
