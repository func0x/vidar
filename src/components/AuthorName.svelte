<script>
	import Box from './Box.svelte';
	import avatarPlaceholder from '$lib/images/avatar_placeholder.svg';
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';

	export let author;
	export let mw = false;
	export let disableRedirect = false;
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if matches}
		<Box
			mw={mw ? '250px' : 'unset'}
			className="author-name"
			padding={mw ? 'unset' : 'var(--gap-s)'}
			ch
			height="fit-content"
			gap="var(--gap-s)"
		>
			{#if disableRedirect}
				<img src={author.avatar_photo || avatarPlaceholder} alt="author" />
				<span class:disableRedirect>{author.name}</span>
			{:else}
				<img src={author.avatar_photo || avatarPlaceholder} alt="author" />
				<a href="/author/{author.id}"><span>{author.name}</span></a>
			{/if}
		</Box>
	{:else}
		<Box
			className="author-name"
			padding="var(--gap-xs) var(--gap-s)"
			ch
			height="fit-content"
			gap="var(--gap-s)"
		>
			{#if disableRedirect}
				<img src={author.avatar_photo || avatarPlaceholder} alt="author" />
				<span class:disableRedirect>{author.name}</span>
			{:else}
				<img src={author.avatar_photo || avatarPlaceholder} alt="author" />
				<a href="/author/{author.id}"><span>{author.name}</span></a>
			{/if}
		</Box>
	{/if}
</MediaQuery>

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

	.disableRedirect {
		color: var(--aubergine);
	}
</style>
