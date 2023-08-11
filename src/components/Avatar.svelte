<script>
	import { page } from '$app/stores';
	import avatarPlaceholder from '$lib/images/avatar_placeholder.svg';

	export let authors;
	const pageUrl = $page.url.pathname.includes('/author/');
</script>

<div class="authors-photos" authors-count={authors.length}>
	{#each authors as author}
		{#if !pageUrl}
			<a href={`/author/${author.id}`}>
				<img src={author.avatar_photo || avatarPlaceholder} alt={author.name} />
			</a>
		{:else}
			<img src={author.avatar_photo || avatarPlaceholder} alt={author.name} />
		{/if}
	{/each}
</div>

<style>
	.authors-photos {
		display: grid;
		width: 40px;
		height: 40px;
		min-width: 40px;
		grid-template-areas:
			'author1 author2'
			'author3 author4';
		grid-column-gap: 2px;
		grid-row-gap: 2px;
		border-radius: 50%;
		overflow: hidden;
	}

	.authors-photos[authors-count='1'] {
		grid-template-areas: 'author1';
	}

	.authors-photos[authors-count='2'] {
		grid-template-areas: 'author1 author2';
	}

	.authors-photos[authors-count='3'] {
		grid-template-areas:
			'author1 author2'
			'author1 author3';
	}

	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}

	img:first-child {
		grid-area: author1;
	}
</style>
