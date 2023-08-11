<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import Avatar from './Avatar.svelte';
	import Box from './Box.svelte';
	import EventAuthor from './EventAuthor.svelte';
	import TagPanel from './TagPanel.svelte';

	export let event;
	export let eventCard = false;
	export let open = false;
	export let videoFooter = false;
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches && !videoFooter}
		<Box bg="transparent" df di gap="var(--gap-s)" fd="column" height="fit-content">
			<svelte:fragment>
				<TagPanel tags={event.tags} />
				<h1 class:eventCard>{event.title}</h1>
				<EventAuthor authors={event.authors} timestamp={event.datetime} />
				<p>
					{event.description}
				</p>
			</svelte:fragment>
		</Box>
	{/if}
	{#if matches && videoFooter}
		<Box
			bg="transparent"
			df
			padding="var(--gap-m) var(--gap-l)"
			gap="var(--gap-s)"
			fd="column"
			height="fit-content"
		>
			<svelte:fragment>
				<TagPanel tags={event.tags} />
				<h1 class:eventCard>{event.title}</h1>
				<EventAuthor authors={event.authors} timestamp={event.datetime} />
				<p>
					{event.description}
				</p>
			</svelte:fragment>
		</Box>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 1115px)" let:matches>
	{#if matches && !videoFooter}
		<Box df fd="column" gap="var(--gap-xs)">
			<Box df gap="var(--gap-s)">
				<Avatar authors={event.authors} />
				<Box df fd="column" gap="var(--gap-xs)">
					<h1>{event.title}</h1>
					<EventAuthor bind:open authors={event.authors} timestamp={event.datetime} />
				</Box>
			</Box>
		</Box>
	{/if}

	{#if matches && videoFooter}
		<Box
			bg="transparent"
			df
			gap="var(--gap-s)"
			padding="var(--gap-s)"
			fd="column"
			height="fit-content"
		>
			<svelte:fragment>
				<TagPanel tags={event.tags} />
				<h1 class:eventCard>{event.title}</h1>
				<EventAuthor videoFooter authors={event.authors} timestamp={event.datetime} />
				<p>
					{event.description}
				</p>
			</svelte:fragment>
		</Box>
	{/if}
</MediaQuery>

<style>
	h1 {
		color: var(--aubergine);
		font-size: var(--font-xl);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	p {
		font-size: var(--font-m);
		color: var(--grey-700);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.eventCard {
		font-size: var(--font-l);
	}

	@media screen and (max-width: 1115px) {
		h1 {
			font-size: var(--font-l);
			color: var(--aubergine);
		}
	}
</style>
