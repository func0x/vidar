<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
	import Box from 'src/components/Box.svelte';
	import MobileEvent from 'src/components/MobileEvent.svelte';
	import Button from 'src/components/Button.svelte';
	import arrow from '$lib/images/next_arrow_white.svg';

	export let data;

	const { recentEvents } = data;
</script>

<svelte:head>
	<title>Vidar &#x2022; 404</title>
</svelte:head>

<Box cvh mt="var(--gap-xl)" fd="column" gap="var(--gap-xl)">
	<Box cvh fd="column" gap="var(--gap-l)">
		<h1>Oops! We can’t find that page.</h1>
		<span>Why not check out our latest videos?</span>
	</Box>
	<Box cvh gap="var(--gap-l)">
		<MediaQuery query="(min-width: 1750px)" let:matches>
			{#if matches}
				<MobileEvent event={recentEvents[0]} />
				<MobileEvent event={recentEvents[1]} />
				<MobileEvent event={recentEvents[2]} />
			{/if}
		</MediaQuery>
		<MediaQuery query="(min-width: 1115px) and (max-width: 1749px)" let:matches>
			{#if matches}
				<MobileEvent event={recentEvents[0]} />
				<MobileEvent event={recentEvents[1]} />
			{/if}
		</MediaQuery>
		<MediaQuery query="(max-width: 1114px)" let:matches>
			{#if matches}
				<MobileEvent event={recentEvents[0]} />
			{/if}
		</MediaQuery>
	</Box>
	<Button text="BACK TO HOME" bg="var(--aubergine)" icon={arrow} notFound />
</Box>

<style>
	h1 {
		font-weight: var(--font-bold);
		font-size: var(--font-xl);
		text-align: center;
	}

	span {
		font-size: var(--font-l);
		font-weight: var(--font-light);
		color: var(--grey-700);
	}
</style>
