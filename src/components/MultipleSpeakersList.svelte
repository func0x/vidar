<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import { authorStore } from 'src/stores/Data';
	import AuthorName from './AuthorName.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	export let authors;
	export let notFound = false;
	export let ai = false;
	export let authorName = '';
	export let selectedAuthor = null;

	export let ref = null;

	function findAuthorByName(authorName) {
		return authors.find((item) => {
			return item.name === authorName;
		});
	}

	const onSelect = (event) => {
		const { innerText } = event.target;

		authorStore.set(innerText);
		authorName = innerText;
		selectedAuthor = findAuthorByName(innerText);

		$page.url.searchParams.set('speaker', JSON.stringify(innerText));
		goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });

		ref.style.display = 'none';
	};
</script>

<MediaQuery query="(min-width: 1115px)" let:matches>
	{#if authorName !== ''}
		{#if matches}
			<div class:ai class="multiple-speakers-list-wrapper">
				<div class:ai class:notFound class="multiple-speakers-list" bind:this={ref}>
					{#each authors as author}
						<div
							class="author-name-wrapper"
							name={author.name}
							on:click={onSelect}
							on:keyup={onSelect}
						>
							<AuthorName disableRedirect {author} />
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<div class:ai class="multiple-speakers-list-mobile" bind:this={ref}>
				{#each authors as author}
					<div class="author-name-wrapper" name={author.name}>
						<div
							class="author-name-wrapper"
							name={author.name}
							on:click={onSelect}
							on:keyup={onSelect}
						>
							<AuthorName {author} disableRedirect />
						</div>
					</div>
				{/each}
			</div>
		{/if}
	{:else if matches}
		<div class:ai class="multiple-speakers-list-wrapper">
			<div class:ai class:notFound class="multiple-speakers-list" bind:this={ref}>
				{#each authors as author}
					<div class="author-name-wrapper" name={author.name}>
						<AuthorName {author} />
					</div>
				{/each}
			</div>
		</div>
	{:else}
		<div class:ai class="multiple-speakers-list-mobile">
			{#each authors as author}
				<AuthorName {author} />
			{/each}
		</div>
	{/if}
</MediaQuery>

<style>
	.multiple-speakers-list-wrapper {
		display: none;
		position: absolute;
		top: 100%;
		left: 0;
		width: 100%;
		padding-top: var(--gap-s);
	}

	.multiple-speakers-list {
		flex-direction: column;
		display: flex;
		width: 100%;
		height: fit-content;
		z-index: 5;
		background-color: var(--white);
		padding: var(--gap-xs) 0;
		border-radius: var(--border-radius-xl);
		animation: dropdown-fade-in 0.35s;
		border: 1px solid white;
		-webkit-filter: drop-shadow(var(--multiple-avatar-shadow));
		box-shadow: var(--multiple-avatar-shadow);
		filter: drop-shadow(var(--multiple-avatar-shadow));
	}

	.author-name-wrapper {
		padding: 0 var(--gap-s);
	}

	.author-name-wrapper:hover {
		background-color: var(--grey-300);
	}

	.author-name-wrapper:hover > :global(.author-name) {
		background-color: var(--grey-300);
	}

	.multiple-speakers-list:after,
	.multiple-speakers-list:before {
		bottom: 100%;
		border: solid transparent;
		content: ' ';
		height: 0;
		width: 0;
		position: absolute;
		pointer-events: none;
	}

	.ai {
		display: flex;
	}
	.ai::after,
	.ai::before {
		display: none;
	}

	.multiple-speakers-list:after {
		border-color: transparent;
		border-bottom-color: var(--white);
		border-width: 10px;
		left: 30%;
		margin-left: -10px;
	}

	.multiple-speakers-list:before {
		border-color: transparent;
		border-width: 10px;
		left: 30%;
		margin-left: -10px;
	}

	.notFound:after {
		left: 13.5%;
	}

	.notFound:before {
		left: 13.5%;
	}

	@media screen and (max-width: 1114px) {
		.multiple-speakers-list-mobile {
			display: flex;
			flex-direction: column;
			background-color: var(--white);
			border-radius: var(--border-radius);
			padding: var(--gap-xs) 0;
			border-top: 1px solid var(--grey-500);
			position: absolute;
			top: 100%;
			width: 100%;
			z-index: 2;
			margin-top: var(--gap-s);
		}

		.ai {
			border: 1px solid var(--grey-500);
		}

		.multiple-speakers-list:after {
			left: 19.5%;
		}

		.multiple-speakers-list:before {
			left: 19.5%;
		}
	}
</style>
