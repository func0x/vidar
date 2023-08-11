<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import arrow from '$lib/images/next_arrow.svg';
	import EventDetails from './EventDetails.svelte';
	import MultipleSpeakersList from './MultipleSpeakersList.svelte';
	import TagInfo from './TagInfo.svelte';
	import { detectLive, detectAfterLive, countDaysAfterLive } from 'src/utils/date';

	export let event;
	let open = false;
	const isLive = detectLive(event.datetime);
	const isAfterLive = detectAfterLive(event.datetime);
	const numberDays = countDaysAfterLive(event.datetime);
</script>

{#if event != undefined}
	<MediaQuery query="(min-width: 1750px)" let:matches>
		{#if matches}
			<Box cvh height="400px" gap="150px">
				<a href={isLive ? event.livestream : `/event/${event.id}`}>
					<img src={event.event_photo} alt="upcoming" />
				</a>
				<Box height="340px" cvh mw="600px" bg="transparent" gap="10px" fd="column">
					{#if isLive && !isAfterLive}
						<TagInfo live text="Live" />
					{/if}
					{#if !isLive && !isAfterLive}
						<TagInfo text="Upcoming" />
					{/if}
					{#if isAfterLive}
						<TagInfo text={`ALREADY STREAMED ${numberDays} DAYS AGO`} />
					{/if}
					<EventDetails {isLive} hover {event} />
					{#if isLive && !isAfterLive}
						<Button
							link
							href={event.livestream}
							icon={arrow}
							text="Watch Live"
							bg="var(--grey-300)"
						/>
					{/if}
				</Box>
			</Box>
		{/if}
	</MediaQuery>

	<MediaQuery query="(min-width: 1115px) and (max-width: 1749px)" let:matches>
		{#if matches}
			<Box cvh height="400px" gap="var(--gap-xl)" padding="0 var(--gap-m)">
				<a href={isLive ? event.livestream : `/event/${event.id}`}>
					<img src={event.event_photo} alt="upcoming" />
				</a>
				<Box height="340px" cvh mw="600px" bg="transparent" gap="10px" fd="column">
					{#if isLive && !isAfterLive}
						<TagInfo live text="Live" />
					{/if}
					{#if !isLive && !isAfterLive}
						<TagInfo text="Upcoming" />
					{/if}
					{#if isAfterLive}
						<TagInfo text={`ALREADY STREAMED ${numberDays} DAYS AGO`} />
					{/if}
					<EventDetails hover {isLive} {event} />
					{#if isLive && !isAfterLive}
						<Button
							link
							href={event.livestream}
							icon={arrow}
							text="Watch Live"
							bg="var(--grey-300)"
						/>
					{/if}
				</Box>
			</Box>
		{/if}
	</MediaQuery>

	<MediaQuery query="(max-width: 1114px)" let:matches>
		{#if matches}
			<Box height="fit-content" df fd="column" gap="var(--gap-s)" position="relative">
				{#if event.upcoming}
					{#if isLive && !isAfterLive}
						<TagInfo live text="Live" />
					{/if}
					{#if !isLive && !isAfterLive}
						<TagInfo text="Upcoming" />
					{/if}
					{#if isAfterLive}
						<TagInfo text={`ALREADY STREAMED ${numberDays} DAYS AGO`} />
					{/if}
				{:else if event.video.title === ''}
					<TagInfo vna text="Not yet available" />
				{/if}
				<a href={isLive ? event.livestream : `/event/${event.id}`}>
					<img src={event.event_photo} alt="upcoming" />
				</a>
				<Box df gap="var(--gap-s)" padding=" 0 var(--gap-s)">
					<EventDetails bind:open {isLive} {event} />
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

	@media screen and (max-width: 1749px) {
		img {
			max-height: 250px;
		}
	}

	@media screen and (max-width: 1114px) {
		img {
			width: 100%;
			max-height: unset;
		}
	}
</style>
