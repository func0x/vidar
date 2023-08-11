<script>
	import Box from './Box.svelte';
	import { formatTimestamp } from 'src/utils/date';
	import { onMount } from 'svelte';
	import Avatar from './Avatar.svelte';
	import MultipleSpeakersList from './MultipleSpeakersList.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';

	export let authors;
	export let timestamp;
	export let open = false;
	export let videoFooter = false;
	export let notFound = false;
	let date;

	onMount(() => {
		date = formatTimestamp(timestamp);
	});

	const openAuthorList = () => {
		open = !open;
	};
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches && !notFound}
		<Box
			height="unset"
			bg="transparent"
			padding="0"
			ch
			gap="var(--gap-xs)"
			position="relative"
			width="fit-content"
			hover
		>
			<Avatar {authors} />

			{#if authors.length >= 2}
				<span class="author-name">Multiple speakers</span>
			{:else}
				<a href={`/author/${authors[0].id}/`}><span class="author-name">{authors[0].name}</span></a>
			{/if}
			<span>&#8226;</span>
			<span>{date}</span>

			{#if authors.length >= 2}
				<MultipleSpeakersList {authors} />
			{/if}
		</Box>
	{:else}
		<Box
			height="unset"
			bg="transparent"
			padding="0"
			ch
			gap="var(--gap-xs)"
			width="fit-content"
			hover
			position="relative"
		>
			{#if videoFooter}
				<Avatar {authors} />
			{/if}
			{#if authors.length >= 2}
				<span on:click={openAuthorList} on:keyup={openAuthorList} class="author-name"
					>Multiple speakers</span
				>
			{:else}
				<a href={`/author/${authors[0].id}/`}><span class="author-name">{authors[0].name}</span></a>
			{/if}
			<span>&#8226;</span>
			<span>{date}</span>

			{#if authors.length >= 2 && open}
				<MultipleSpeakersList {authors} />
			{/if}
		</Box>
	{/if}
</MediaQuery>

<style>
	span {
		color: var(--aubergine);
	}

	.author-name {
		color: var(--red);
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}

	@media screen and (max-width: 1114px) {
		span {
			font-size: var(--font-m);
			color: var(--aubergine);
		}
	}
</style>
