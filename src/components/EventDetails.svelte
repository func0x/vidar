<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import { replaceParamUrl } from 'src/utils/replace';
	import download from '$lib/images/download_icon.svg';
	import slides from '$lib/images/slides.svg';
	import Avatar from './Avatar.svelte';
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import EventAuthor from './EventAuthor.svelte';
	import Tag from './Tag.svelte';
	import TagPanel from './TagPanel.svelte';
	import { selectedTagsStore } from '../stores/Data';
	import { searchedSelectedTagsStore } from '../stores/SearchData';

	export let event;
	export let eventCard = false;
	export let open = false;
	export let videoFooter = false;
	export let hover = false;
	export let isLive = false;
	export let exploreSimilar = false;
	export let titleUnlimited = false;

	const downloadSlides = (assets) => {
		const a = document.createElement('a');
		a.href = assets.slides.path;
		a.setAttribute('download', assets.slides.name);
		a.click();
	};
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches && !videoFooter}
		<Box bg="transparent" df di gap="var(--gap-s)" fd="column" height="fit-content">
			<svelte:fragment>
				{#key $selectedTagsStore || $searchedSelectedTagsStore}
					<TagPanel>
						{#each event.tags as tag}
							<Tag text={tag} />
						{/each}
					</TagPanel>
				{/key}
				<a href={isLive ? event.livestream : `/event/${replaceParamUrl(event.title)}/`}>
					<h1 class:titleUnlimited class:hover class:eventCard>{event.title}</h1>
				</a>
				<EventAuthor authors={event.authors} timestamp={event.datetime} />
				<a href={isLive ? event.livestream : `/event/${replaceParamUrl(event.title)}/`}>
					<p>
						{event.description}
					</p>
				</a>
			</svelte:fragment>
		</Box>
	{/if}
	{#if matches && videoFooter}
		<Box
			bg="transparent"
			df
			padding={exploreSimilar ? 'unset' : 'var(--gap-m) var(--gap-l)'}
			gap="var(--gap-s)"
			fd="column"
			height="fit-content"
		>
			<TagPanel>
				{#each event.tags as tag}
					<Tag text={tag} redirect />
				{/each}
			</TagPanel>
			{#if exploreSimilar}
				<a href={isLive ? event.livestream : `/event/${replaceParamUrl(event.title)}/`}>
					<h1 class:hover class:eventCard>{event.title}</h1>
				</a>
			{:else}
				<h1 class:hover class:eventCard>{event.title}</h1>
			{/if}
			<EventAuthor authors={event.authors} timestamp={event.datetime} />
			<p class="event-video-description">
				{event.description}
			</p>
			{#if !exploreSimilar}
				{#if event.assets.slides.name.includes('https://')}
					<Button
						bg="var(--grey-300)"
						href={event.assets.slides.name}
						icon={slides}
						text="Open with Google Slides"
					/>
				{:else if event.assets.slides.name.includes('.')}
					<Button
						bg="var(--white)"
						onClick={() => downloadSlides(event.assets)}
						icon={download}
						text="Download slides"
					/>
				{/if}
			{/if}
		</Box>
	{/if}
</MediaQuery>

<MediaQuery query="(max-width: 1114px)" let:matches>
	{#if matches && !videoFooter}
		<Box df fd="column" gap="var(--gap-xs)">
			<Box df gap="var(--gap-s)">
				<Avatar authors={event.authors} />
				<Box df fd="column" gap="var(--gap-xs)">
					<a href={isLive ? event.livestream : `/event/${replaceParamUrl(event.title)}/`}>
						<h1 class:hover>{event.title}</h1>
					</a>
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
				<TagPanel>
					{#each event.tags as tag}
						<Tag text={tag} redirect />
					{/each}
				</TagPanel>
				<h1 class:hover class:eventCard>{event.title}</h1>
				<EventAuthor videoFooter authors={event.authors} timestamp={event.datetime} />
				<p class="event-video-description">
					{event.description}
				</p>
				{#if !exploreSimilar}
					{#if event.assets.slides.name.includes('https://')}
						<Button
							bg="var(--grey-300)"
							href={event.assets.slides.name}
							icon={slides}
							text="Open with Google Slides"
						/>
					{:else if event.assets.slides.name.includes('.')}
						<Button
							bg="var(--white)"
							onClick={() => downloadSlides(event.assets)}
							icon={download}
							text="Download slides"
						/>
					{/if}
				{/if}
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
		-webkit-box-orient: vertical;
	}

	.titleUnlimited {
		-webkit-line-clamp: 3;
	}

	p {
		font-size: var(--font-m);
		color: var(--grey-700);
		overflow: hidden;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.event-video-description {
		-webkit-line-clamp: unset;
	}

	.eventCard {
		font-size: var(--font-l);
	}

	.hover:hover {
		color: var(--red);
	}

	@media screen and (min-width: 1115px) and (max-width: 1750px) {
		h1 {
			font-size: 35px;
			color: var(--aubergine);
		}
	}

	@media screen and (max-width: 1114px) {
		h1 {
			font-size: var(--font-l);
			color: var(--aubergine);
		}
	}
</style>
