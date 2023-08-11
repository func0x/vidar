<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import Box from './Box.svelte';
	import Tag from './Tag.svelte';
	import EventAuthor from './EventAuthor.svelte';
	import Button from './Button.svelte';
	import arrow from '$lib/images/button_icon.svg';
	import { onMount } from 'svelte';
	import { jsonEvents } from 'src/stores/Data';
	import Avatar from './Avatar.svelte';
	import SectionName from './SectionName.svelte';

	let events = [];
	let event;
	onMount(async () => {
		await jsonEvents().then((res) => (events = res));

		event = events.filter((x) => {
			return x.upcoming === true;
		});

		if (event.length !== 0) {
			event = event.reduce((x, y) => (x.datetime < y.datetime ? x : y));
		}
	});
</script>

{#if event != undefined}
	<MediaQuery query="(min-width: 1640px)" let:matches>
		{#if matches}
			<Box cvh height="400px" bg="var(--aubergine)" gap="150px">
				<img src={event.event_photo} alt="upcoming" />
				<Box height="290px" df mw="600px" bg="transparent" gap="10px" fd="column">
					<Box ch bg="transparent" height="unset" gap="var(--gap-s)">
						{#each event.tags as tag}
							<Tag text={tag} />
						{/each}
					</Box>
					<h1>{event.title}</h1>
					<EventAuthor authors={event.authors} timestamp={event.datetime} />
					<p>
						{event.description}
					</p>
					<Box bg="transparent" ch height="unset" je>
						<Button icon={arrow} text="Watch Live" bg="transparent" />
					</Box>
				</Box>
			</Box>
		{/if}
	</MediaQuery>

	<MediaQuery query="(min-width: 1115px) and (max-width: 1639px)" let:matches>
		{#if matches}
			<Box cvh height="400px" bg="var(--aubergine)" padding="0 var(--gap-l)">
				<img src={event.event_photo} alt="upcoming" />
				<Box height="290px" df mw="600px" bg="transparent" gap="10px" fd="column">
					<Box ch bg="transparent" height="unset" gap="var(--gap-s)">
						{#each event.tags as tag}
							<Tag text={tag} />
						{/each}
					</Box>
					<h1>{event.title}</h1>
					<EventAuthor authors={event.authors} timestamp={event.datetime} />
					<p>
						{event.description}
					</p>
					<Box bg="transparent" ch height="unset" je>
						<Button icon={arrow} text="Watch Live" bg="transparent" />
					</Box>
				</Box>
			</Box>
		{/if}
	</MediaQuery>

	<MediaQuery query="(max-width: 1115px)" let:matches>
		{#if matches}
			<SectionName title="Upcoming Livestream" />
			<Box height="fit-content" df fd="column" gap="var(--gap-s)">
				<img src={event.event_photo} alt="upcoming" />
				<Box df gap="var(--gap-s)" padding="0 var(--gap-m)">
					<Avatar authors={event.authors} />
					<Box df fd="column" gap="var(--gap-xs)">
						<h1>{event.title}</h1>
						<EventAuthor authors={event.authors} timestamp={event.datetime} />
					</Box>
				</Box>
			</Box>
		{/if}
	</MediaQuery>
{/if}

<style>
	h1 {
		font-size: var(--font-xl);
		font-weight: var(--font-bold);
		color: var(--white);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	img {
		max-height: 340px;
	}

	p {
		font-size: var(--font-m);
		color: var(--grey-700);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	@media screen and (max-width: 1115px) {
		img {
			width: 100%;
			max-height: unset;
		}

		h1 {
			font-size: var(--font-l);
			color: var(--aubergine);
		}
	}
</style>
