<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import { replaceParamUrl } from 'src/utils/replace';
	import EventDetails from './EventDetails.svelte';
	import TagInfo from './TagInfo.svelte';
	import Upcoming from './Upcoming.svelte';

	export let event;
	export let hover = false;
	export let exploreSimilar = false;
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches}
		<div class="container">
			<a href={`/event/${replaceParamUrl(event.title)}`}>
				<img src={event.event_photo} alt="event" />
			</a>
			{#if event.video.title === ''}
				<TagInfo vna text="Not yet available" />
			{/if}
			{#if exploreSimilar}
				<EventDetails {hover} videoFooter {exploreSimilar} eventCard {event} />
			{:else}
				<EventDetails {hover} eventCard {event} />
			{/if}
		</div>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 1114px)" let:matches>
	{#if matches}
		<Upcoming {event} />
	{/if}
</MediaQuery>

<style>
	img {
		height: 190px;
		border-radius: var(--border-radius);
		position: relative;
	}

	.container {
		display: grid;
		position: relative;
		width: 100%;
		grid-template-columns: 340px 1fr;
		grid-column-gap: var(--gap-m);
		grid-row-gap: var(--gap-m);
	}
</style>
