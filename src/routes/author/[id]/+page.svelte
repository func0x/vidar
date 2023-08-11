<script>
	import Box from 'src/components/Box.svelte';
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import placeholder from '$lib/images/avatar_placeholder.svg';

	export let data;
</script>

<svelte:head>
	<title>
		Vidar &#x2022; {data.author !== undefined ? data.author.name : 'Not Found'}
	</title>
</svelte:head>

<Box height="290px">
	<Box cvh gap="var(--gap-m)" fd="column">
		<a href={`${data.author.contact.profile}/`}>
			<img src={data.author.avatar_photo || placeholder} alt={data.author.name} />
		</a>
		<Box cvh bg="transparent" fd="column" width="fit-content" height="fit-content">
			<span class="author-name">{data.author.name}</span>
			<span class="job-position-location">{data.author.job_position}</span>
			<span class="job-position-location">{data.author.location}</span>
		</Box>
	</Box>
</Box>
<SectionName title="{data.author.name} Events" />
<RecentEvents hover events={data.events} />

<style>
	img {
		width: 90px;
		height: 90px;
		border-radius: 50%;
	}

	.author-name {
		font-size: var(--font-l);
		font-weight: var(--font-bold);
	}

	.job-position-location {
		font-size: var(--font-m);
	}
</style>
