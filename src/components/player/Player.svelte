<script>
	import Box from 'src/components/Box.svelte';
	import noVideo from '$lib/images/no_video.svg';
</script>

<Box height="720px" bg="black" cvh>
	<Box df gap="var(--gap-xl)" width="fit-content" height="fit-content" bg="transparent" ch>
		<img src={noVideo} alt="no-video" />
		<span>VIDEO NOT YET AVAILABLE</span>
	</Box>
</Box>

<style>
	span {
		color: var(--white);
		font-size: var(--font-xl);
	}
</style>
