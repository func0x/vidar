<script>
	import Box from './Box.svelte';
	import { formatTimestamp } from 'src/utils/date';
	import { onMount } from 'svelte';
	import Avatar from './Avatar.svelte';
	import MultipleSpeakersList from './MultipleSpeakersList.svelte';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';

	export let authors;
	export let timestamp;
	let date;

	onMount(() => {
		date = formatTimestamp(timestamp);
	});
</script>

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
	<MediaQuery query="(min-width: 1115px)" let:matches>
		{#if matches}
			<Avatar {authors} />
		{/if}
	</MediaQuery>
	{#if authors.length > 2}
		<span class="author-name">Multiple speakers</span>
	{:else}
		{#each authors as author}
			<span class="author-name">{author.name}</span>
		{/each}
	{/if}
	<span>&#8226;</span>
	<span>{date}</span>

	{#if authors.length > 2}
		<MultipleSpeakersList {authors} />
	{/if}
</Box>

<style>
	span {
		color: var(--white);
	}

	.author-name {
		color: var(--red);
	}

	@media screen and (max-width: 1115px) {
		span {
			font-size: var(--font-m);
			color: var(--aubergine);
		}
	}
</style>
