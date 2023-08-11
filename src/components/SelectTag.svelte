<script>
	import deleteIcon from '$lib/images/delete_white.svg';
	export let text;
	export let onDelete;
</script>

<div on:click={() => onDelete(text)} on:keydown={void 0}>
	<span>{text}</span>
	<img src={deleteIcon} alt="delete" />
</div>

<style>
	div {
		background-color: var(--tag-color);
		color: var(--white);
		padding: var(--gap-s);
		width: fit-content;
		max-height: 35px;
		border-radius: var(--border-radius-xl);
		display: flex;
		white-space: nowrap;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		font-size: var(--font-s);
		display: flex;
		gap: var(--gap-xs);
		cursor: pointer;
	}

	div:hover {
		background-color: var(--grey-700);
	}
</style>
