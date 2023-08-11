<script>
	import Box from './Box.svelte';
	import Button from './Button.svelte';
	import Select from './Select.svelte';
	import TagPanel from './TagPanel.svelte';
	import filter from '$lib/images/filter.svg';

	const options = ['Latest', 'Earliest'];
	const tags = [];
</script>

<Box cvh jsb padding="0 var(--gap-l) var(--gap-l) var(--gap-l)">
	<Box width="fit-content" cvh gap="var(--gap-s)">
		<span>Sort by:</span>
		<Select {options} />
	</Box>
	<TagPanel
		{tags}
		fp
		tagBg="var(--white)"
		hbg="var(--grey-500)"
		hc="var(--aubergine)"
		fs="var(--font-m)"
	/>
	<Button icon={filter} text="Filters" bg="var(--white)" border="1px solid var(--grey-500)" />
</Box>
