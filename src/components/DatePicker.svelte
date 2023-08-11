<script>
	import { DateInput } from 'date-picker-svelte';
	import Box from './Box.svelte';

	export let label;
	export let date;
</script>

<Box width="fit-content" df fd="column" gap="var(--gap-xs)">
	<span>{label}</span>
	<DateInput
		format="yyyy-MM-dd"
		browseWithoutSelecting
		placeholder="yyyy-MM-dd"
		bind:value={date}
	/>
</Box>

<style>
	span {
		font-size: var(--font-m);
		color: var(--aubergine);
	}
</style>
