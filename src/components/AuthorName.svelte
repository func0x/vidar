<script>
	import Box from './Box.svelte';

	export let author;
</script>

<Box ch height="fit-content" gap="var(--gap-s)">
	<img src={author.avatar_photo} alt="author" />
	<span>{author.name}</span>
</Box>

<style>
	img {
		width: 40px;
		height: 40px;
		border-radius: 50%;
	}

	span {
		font-size: var(--font-m);
		color: var(--red);
	}
</style>
