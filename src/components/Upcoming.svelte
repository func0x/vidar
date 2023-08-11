<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import arrow from '$lib/images/next_arrow.svg';
	import Avatar from './Avatar.svelte';
	import EventDetails from './EventDetails.svelte';
	import MultipleSpeakersList from './MultipleSpeakersList.svelte';
	import TagInfo from './TagInfo.svelte';

	export let event;
	let open = false;
</script>

{#if event != undefined}
	<MediaQuery query="(min-width: 1750px)" let:matches>
		{#if matches}
			<Box cvh height="400px" gap="150px">
				<img src={event.event_photo} alt="upcoming" />
				<Box height="340px" cvh mw="600px" bg="transparent" gap="10px" fd="column">
					<TagInfo text="Upcoming" />
					<EventDetails {event} />
					<Button icon={arrow} text="Watch Live" bg="var(--grey-300)" />
				</Box>
			</Box>
		{/if}
	</MediaQuery>

	<MediaQuery query="(min-width: 1115px) and (max-width: 1750px)" let:matches>
		{#if matches}
			<Box cvh height="400px" gap="var(--gap-xl)" padding="0 var(--gap-m)">
				<img src={event.event_photo} alt="upcoming" />
				<Box height="340px" cvh mw="600px" bg="transparent" gap="10px" fd="column">
					<TagInfo text="Upcoming" />
					<EventDetails {event} />
					<Button icon={arrow} text="Watch Live" bg="var(--grey-300)" />
				</Box>
			</Box>
		{/if}
	</MediaQuery>

	<MediaQuery query="(max-width: 1115px)" let:matches>
		{#if matches}
			<Box height="fit-content" df fd="column" gap="var(--gap-s)" position="relative">
				{#if event.upcoming}
					<TagInfo text="Upcoming" />
				{:else if event.video.title === ''}
					<TagInfo vna text="Not yet available" />
				{/if}
				<img src={event.event_photo} alt="upcoming" />
				<Box df gap="var(--gap-s)" padding=" 0 var(--gap-s)">
					<EventDetails bind:open {event} />
				</Box>

				{#if event.authors.length >= 2 && open}
					<MultipleSpeakersList authors={event.authors} />
				{/if}
			</Box>
		{/if}
	</MediaQuery>
{/if}

<style>
	img {
		max-height: 340px;
	}

	@media screen and (max-width: 1115px) {
		img {
			width: 100%;
			max-height: unset;
		}
	}
</style>
