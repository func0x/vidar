<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import Box from 'src/components/Box.svelte';
	import noVideo from '$lib/images/no_video.svg';
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches}
		<Box height="720px" bg="black" cvh>
			<Box df gap="var(--gap-xl)" width="fit-content" height="fit-content" bg="transparent" ch>
				<img src={noVideo} alt="no-video" />
				<span>VIDEO NOT YET AVAILABLE</span>
			</Box>
		</Box>
	{:else}
		<Box height="720px" bg="black" cvh>
			<Box
				df
				fd="column"
				gap="var(--gap-xl)"
				width="fit-content"
				height="fit-content"
				bg="transparent"
				ch
			>
				<img src={noVideo} alt="no-video" />
				<span>VIDEO NOT YET AVAILABLE</span>
			</Box>
		</Box>
	{/if}
</MediaQuery>

<style>
	span {
		color: var(--white);
		font-size: var(--font-xl);
		text-align: center;
	}
</style>
