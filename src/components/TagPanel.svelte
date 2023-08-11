<script>
	import { onMount } from 'svelte';
	import Box from './Box.svelte';
	import backArrow from '$lib/images/back_arrow.svg';
	import nextArrow from '$lib/images/next_arrow.svg';
	import { selectedTagsStore } from '../stores/Data';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { searchedSelectedTagsStore } from '../stores/SearchData';

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
		Object.entries(boxRef.children).forEach(([_, value]) => {
			if ($page.url.pathname.includes('/search/')) {
				if (value.localName === 'span' && $searchedSelectedTagsStore.includes(value.innerText)) {
					value.style.backgroundColor = 'var(--aubergine)';
					value.style.color = 'var(--white)';
				} else if (
					value.localName === 'span' &&
					!$searchedSelectedTagsStore.includes(value.innerText)
				) {
					value.style.backgroundColor = 'var(--grey-300)';
					value.style.color = 'var(--aubergine)';
				}
			} else {
				if (value.localName === 'span' && $selectedTagsStore.includes(value.innerText)) {
					value.style.backgroundColor = 'var(--aubergine)';
					value.style.color = 'var(--white)';
				} else if (value.localName === 'span' && !$selectedTagsStore.includes(value.innerText)) {
					value.style.backgroundColor = 'var(--grey-300)';
					value.style.color = 'var(--aubergine)';
				}
			}
		});
	};

	const changeSelected = (event) => {
		Object.entries(boxRef.children).forEach(([_, value]) => {
			if (value.localName === 'span') {
				if (value === event.target) {
					if ($page.url.pathname.includes('/search/')) {
						if (!$searchedSelectedTagsStore.includes(value.innerText)) {
							value.style.backgroundColor = 'var(--aubergine)';
							value.style.color = 'var(--white)';
							$searchedSelectedTagsStore = [...$searchedSelectedTagsStore, value.innerText];
							$page.url.searchParams.set('tags', JSON.stringify($searchedSelectedTagsStore));
							goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
						} else {
							$searchedSelectedTagsStore = $searchedSelectedTagsStore.filter(
								(x) => x !== value.innerText
							);
							$page.url.searchParams.set('tags', JSON.stringify($searchedSelectedTagsStore));
							goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
						}
					} else {
						if (!$selectedTagsStore.includes(value.innerText)) {
							value.style.backgroundColor = 'var(--aubergine)';
							value.style.color = 'var(--white)';
							$selectedTagsStore = [...$selectedTagsStore, value.innerText];
							$page.url.searchParams.set('tags', JSON.stringify($selectedTagsStore));
							goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
						} else {
							$selectedTagsStore = $selectedTagsStore.filter((x) => x !== value.innerText);
							$page.url.searchParams.set('tags', JSON.stringify($selectedTagsStore));
							goto(`?${$page.url.searchParams.toString()}`, { noScroll: true, replaceState: true });
						}
					}
				} else {
					value.style.backgroundColor = 'var(--grey-300)';
					value.style.color = 'var(--aubergine)';
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

		if (!$page.url.pathname.includes('/event/')) {
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
