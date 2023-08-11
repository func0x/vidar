<script>
	import Box from 'src/components/Box.svelte';
	import RecentEvents from 'src/components/RecentEvents.svelte';
	import SectionName from 'src/components/SectionName.svelte';
	import placeholder from '$lib/images/avatar_placeholder.svg';

	export let data;

	const { name, avatar_src, job_position, location } = data.author;
	const { events } = data;

	console.log(avatar_src);
</script>

<Box height="290px">
	<Box cvh gap="var(--gap-m)" fd="column">
		<img src={avatar_src || placeholder} alt={name} />
		<Box cvh bg="transparent" fd="column" width="fit-content" height="fit-content">
			<span class="author-name">{name}</span>
			<span class="job-position-location">{job_position}</span>
			<span class="job-position-location">{location}</span>
		</Box>
	</Box>
</Box>
<SectionName title="{name} Events" />
<RecentEvents {events} />

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
