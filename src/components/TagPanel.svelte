<script>
	import { onMount } from 'svelte';
	import Box from './Box.svelte';
	import Tag from './Tag.svelte';
	import backArrow from '$lib/images/back_arrow.svg';
	import nextArrow from '$lib/images/next_arrow.svg';

	export let tags;

	let boxRef;
	let leftArrowRef;
	let rightArrrowRef;

	const showArrows = () => {
		if (boxRef != null && leftArrowRef != null && rightArrrowRef != null) {
			if (boxRef.scrollWidth > boxRef.clientWidth) {
				leftArrowRef.style.display = 'none';
				rightArrrowRef.style.display = 'flex';
			} else {
				leftArrowRef.style.display = 'none';
				rightArrrowRef.style.display = 'none';
			}
		}
	};

	onMount(() => {
		showArrows();
		window.addEventListener('resize', () => showArrows());
	});

	const clickScroll = (scrollValue) => {
		boxRef.scrollLeft += scrollValue;

		if (boxRef.scrollLeft > 0 && boxRef.scrollLeft < boxRef.scrollLeftMax) {
			leftArrowRef.style.display = 'flex';
			leftArrowRef.style.left = `${boxRef.scrollLeft}px`;

			rightArrrowRef.style.display = 'flex';
			rightArrrowRef.style.right = `${-1 * boxRef.scrollLeft}px`;
		} else if (boxRef.scrollLeft === 0) {
			leftArrowRef.style.display = 'none';

			rightArrrowRef.style.display = 'flex';
			rightArrrowRef.style.right = '0';
		} else if (boxRef.scrollLeft === boxRef.scrollLeftMax) {
			leftArrowRef.style.display = 'flex';
			leftArrowRef.style.left = `${boxRef.scrollLeftMax}px`;

			rightArrrowRef.style.display = 'none';
		}
	};
</script>

<Box tp ds bind:boxRef>
	<Box la bind:boxRef={leftArrowRef}>
		<img
			src={backArrow}
			alt="next"
			on:keyup={() => clickScroll(-120)}
			on:click={() => clickScroll(-120)}
		/>
	</Box>
	{#each tags as tag}
		<Tag text={tag} />
	{/each}
	<Box ra bind:boxRef={rightArrrowRef}>
		<img
			src={nextArrow}
			alt="next"
			on:keyup={() => clickScroll(120)}
			on:click={() => clickScroll(120)}
		/>
	</Box>
</Box>
