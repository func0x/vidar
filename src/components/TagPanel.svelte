<script>
	import { onMount } from 'svelte';
	import Box from './Box.svelte';
	import backArrow from '$lib/images/back_arrow.svg';
	import nextArrow from '$lib/images/next_arrow.svg';

	export let fp = false; // FilterPanel

	export let boxRef;
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

	const initSelectedTag = () => {
		boxRef.children[1].style.backgroundColor = 'var(--aubergine)';
		boxRef.children[1].style.color = 'var(--white)';
		boxRef.children[1].style.pointerEvents = 'none';
	};

	const changeSelected = (event) => {
		Object.entries(boxRef.children).forEach(([_, value]) => {
			if (value.localName === 'span') {
				if (value === event.target) {
					value.style.backgroundColor = 'var(--aubergine)';
					value.style.color = 'var(--white)';
					value.style.pointerEvents = 'none';
				} else {
					value.style.backgroundColor = 'var(--white)';
					value.style.color = 'var(--aubergine)';
					value.style.pointerEvents = 'auto';
				}
			}
		});
	};

	const addClickTagEvent = () => {
		Object.entries(boxRef.children).forEach(([_, value]) => {
			if (value.localName === 'span') {
				value.addEventListener('click', (event) => changeSelected(event));
			}
		});
	};

	onMount(() => {
		showArrows();

		window.addEventListener('resize', () => showArrows());

		if (fp) {
			initSelectedTag();
			addClickTagEvent();
		}
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

<Box tp ds bind:boxRef>
	<Box la bind:boxRef={leftArrowRef}>
		<img
			src={backArrow}
			alt="next"
			on:keyup={() => clickScroll(-120)}
			on:click={() => clickScroll(-120)}
		/>
	</Box>
	<slot />
	<Box ra bind:boxRef={rightArrrowRef}>
		<img
			src={nextArrow}
			alt="next"
			on:keyup={() => clickScroll(120)}
			on:click={() => clickScroll(120)}
		/>
	</Box>
</Box>
