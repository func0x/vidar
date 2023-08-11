<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import Avatar from './Avatar.svelte';
	import Box from './Box.svelte';
	import EventAuthor from './EventAuthor.svelte';
	import MultipleSpeakersList from './MultipleSpeakersList.svelte';

	export let event;
	let open = false;
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches}
		<Box
			mw="min-content"
			height="fit-content"
			df
			fd="column"
			gap="var(--gap-s)"
			position="relative"
			hover
		>
			<img src={event.event_photo} alt="upcoming" />
			<Box df gap="var(--gap-s)">
				<Avatar authors={event.authors} />
				<Box df fd="column" gap="var(--gap-xs)">
					<h1>{event.title}</h1>
					<Box position="relative" hover>
						<EventAuthor notFound authors={event.authors} timestamp={event.datetime} />
						{#if event.authors.length >= 2}
							<MultipleSpeakersList notFound authors={event.authors} />
						{/if}
					</Box>
				</Box>
			</Box>
		</Box>
	{:else}
		<Box height="fit-content" df fd="column" gap="var(--gap-s)" position="relative">
			<img src={event.event_photo} alt="upcoming" />
			<Box df gap="var(--gap-s)">
				<Avatar authors={event.authors} />
				<Box df fd="column" gap="var(--gap-xs)">
					<h1>{event.title}</h1>
					<EventAuthor notFound bind:open authors={event.authors} timestamp={event.datetime} />
				</Box>
			</Box>
			{#if event.authors.length >= 2 && open}
				<MultipleSpeakersList authors={event.authors} />
			{/if}
		</Box>
	{/if}
</MediaQuery>

<style>
	h1 {
		font-size: var(--font-l);
		color: var(--aubergine);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	img {
		max-height: 280px;
	}

	@media screen and (max-width: 1115px) {
		img {
			width: 100%;
			min-height: 170px;
			max-height: unset;
		}
	}
</style>
