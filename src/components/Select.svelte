<script>
	import { onMount } from 'svelte';

	export let options;

	export let selected = options[0];
	let optionsContainer;

	const changeSelectedOption = (options, value) => {};

	onMount(() => {
		changeSelectedOption(optionsContainer.childNodes, selected);
	});

	const changeSelected = (event) => {};
</script>

<div class="dropdown-wrapper">
	<div class="dropdown">
		{selected}
	</div>
	<div bind:this={optionsContainer} class="dropdown-content">
		{#each options as option}
			<div on:keyup={changeSelected} on:click={changeSelected} name={option}>{option}</div>
		{/each}
	</div>
</div>

<style>
	.dropdown {
		border: 1px solid var(--grey-500);
		border-radius: var(--border-radius);
		height: 40px;
		width: 90px;
		display: flex;
		align-items: center;
		padding: 12px 16px;
		font-size: var(--font-m);
		color: var(--aubergine);
		background-image: url(../lib/images/down_arrow.svg);
		background-repeat: no-repeat;
		background-position-x: 90%;
		background-position-y: 52%;
	}

	.dropdown-wrapper {
		position: relative;
		display: inline-block;
	}

	.dropdown-content {
		animation: dropdown-fade-in 0.35s;
		display: none;
		position: absolute;
		border: 1px solid var(--grey-500);
		background-color: var(--white);
		border-radius: var(--border-radius);
		width: 120px;
		z-index: 1;
	}

	.dropdown-content div {
		color: var(--aubergine);
		padding: 12px 16px;
		text-decoration: none;
		display: block;
		cursor: pointer;
	}

	.dropdown-content div:hover {
		background-color: var(--grey-300);
	}

	.dropdown-wrapper:hover .dropdown-content {
		display: block;
	}

	.dropdown-content > div:first-child {
		color: var(--red);
	}
</style>
