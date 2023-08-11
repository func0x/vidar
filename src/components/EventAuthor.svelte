<script>
	import Box from './Box.svelte';
	import { formatTimestamp } from 'src/utils/date';
	import { onMount } from 'svelte';
	import Avatar from './Avatar.svelte';
	import MultipleSpeakersList from './MultipleSpeakersList.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';

	export let authors;
	export let timestamp;
	export let eventCard = false;
	export let open = false;
	let date;

	onMount(() => {
		date = formatTimestamp(timestamp);
	});

	const openAuthorList = () => {
		open = !open;
	};
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches}
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
				<span class="author-name">{authors[0].name}</span>
			{/if}
			<span class:eventCard>&#8226;</span>
			<span class:eventCard>{date}</span>

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
		>
			{#if authors.length >= 2}
				<span on:click={openAuthorList} on:keyup={openAuthorList} class="author-name"
					>Multiple speakers</span
				>
			{:else}
				<span class="author-name">{authors[0].name}</span>
			{/if}
			<span class:eventCard>&#8226;</span>
			<span class:eventCard>{date}</span>
		</Box>
	{/if}
</MediaQuery>

<style>
	span {
		color: var(--white);
	}

	.author-name {
		color: var(--red);
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		cursor: pointer;
	}

	.eventCard {
		color: var(--aubergine);
	}

	@media screen and (max-width: 1115px) {
		span {
			font-size: var(--font-m);
			color: var(--aubergine);
		}
	}
</style>
