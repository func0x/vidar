<script>
	import { onMount } from 'svelte';
	import Box from './Box.svelte';
	import Tag from './Tag.svelte';
	import backArrow from '$lib/images/back_arrow.svg';
	import nextArrow from '$lib/images/next_arrow.svg';

	export let tags;
	export let fp = false; // FilterPanel
	export let tagBg = 'var(--grey-300)';
	export let hbg = 'var(--grey-700)'; // tag hover bg color
	export let hc = 'var(--white)'; // hover color
	export let fs = 'var(--font-s)'; // font size

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
		const scrollLeftMax = boxRef.scrollWidth - boxRef.clientWidth;
		boxRef.scrollLeft += scrollValue;

		if (boxRef.scrollLeft > 0 && boxRef.scrollLeft < scrollLeftMax) {
			leftArrowRef.style.display = 'flex';
			leftArrowRef.style.left = `${boxRef.scrollLeft}px`;

			rightArrrowRef.style.display = 'flex';
			rightArrrowRef.style.right = `${-1 * boxRef.scrollLeft}px`;
		} else if (boxRef.scrollLeft === 0) {
			leftArrowRef.style.display = 'none';

			rightArrrowRef.style.display = 'flex';
			rightArrrowRef.style.right = '0';
		} else if (boxRef.scrollLeft === scrollLeftMax) {
			leftArrowRef.style.display = 'flex';
			leftArrowRef.style.left = `${scrollLeftMax}px`;

			rightArrrowRef.style.display = 'none';
		}
	};
</script>

<Box tp {fp} ds bind:boxRef>
	<Box la bind:boxRef={leftArrowRef}>
		<img
			src={backArrow}
			alt="next"
			on:keyup={() => clickScroll(-120)}
			on:click={() => clickScroll(-120)}
		/>
	</Box>
	{#each tags as tag}
		<Tag text={tag} bg={tagBg} {hbg} {hc} {fs} />
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
