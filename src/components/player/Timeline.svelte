<script>
	import Marker from './Marker.svelte';
	import { onMount } from 'svelte';

	export let video;
	let thumb;
	export let timestamps;
	export let duration;
	export let currentPercent;
	$: {
		if (thumb) thumb.style.setProperty('--progress-position', currentPercent);
	}
	let wrapper;

	let isScrubbing = false;
	let previewTimestamp = 0;
	let timeMove = 0.0;
	let position = 0;

	onMount(() => {
		wrapper = document.querySelector('.progress-wrapper');
	});

	const handleMove = (e) => {
		if (!video.duration) return;

		const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
		const { left, right, top, bottom } = wrapper.getBoundingClientRect();
		const percent = Math.min(Math.max((clientX - left) / (right - left), 0), 1);
		if (clientX < left || clientX > right || e.clientY < top || e.clientY > bottom) {
			previewTimestamp = 0;
		} else {
			previewTimestamp = video.duration * percent;
		}

		timeMove = (video.duration * (clientX - left)) / (right - left);

		if (e.target) {
			try {
				const test = e.target?.getBoundingClientRect();
				position = e.clientX - test.left;
			} catch (error) {
				position = 0;
			}
		}

		if (isScrubbing) {
			video.currentTime = (video.duration * (clientX - left)) / (right - left);
			wrapper.style.setProperty('--preview-position', percent);
		}
	};

	const handleMousedown = (e) => {
		if (e.type !== 'touchstart' && e.button !== 0) return;
		video.pause();
		isScrubbing = true;

		const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
		const { left, right } = wrapper.getBoundingClientRect();
		video.currentTime = (video.duration * (clientX - left)) / (right - left);

		const percent = (clientX - left) / (right - left);

		console.log(percent);

		thumb.style.setProperty('--progress-position', percent);
	};

	const handleMouseup = () => {
		setTimeout(function () {
			video.play();
		}, 150);
	};

	const handleDocumentMouseDown = () => {
		if (isScrubbing) {
			isScrubbing = false;
			video.play();
		}
	};

	onMount(() => {
		document.addEventListener('mousemove', handleMove);
		document.addEventListener('mouseup', handleDocumentMouseDown);
		return () => {
			document.removeEventListener('mousemove', handleMove);
			document.removeEventListener('mouseup', handleDocumentMouseDown);
		};
	});
</script>

<div
	class="progress-wrapper"
	on:touchmove|preventDefault={handleMove}
	on:mousedown={handleMousedown}
	on:mouseup={handleMouseup}
>
	<div bind:this={thumb} class="thumb-indicator" />
	<div class="markers">
		{#each timestamps as timestamp}
			<Marker
				{timestamp}
				{duration}
				currentTime={currentPercent * duration}
				previewTime={previewTimestamp}
				{timeMove}
				{position}
			/>
		{/each}
	</div>
</div>

<style>
	.progress-wrapper {
		height: 18px;
		display: grid;
		align-items: center;
		user-select: none;
	}

	.progress-wrapper > * {
		grid-column: 1;
		grid-row: 1;
	}

	.markers {
		display: flex;
		align-items: stretch;
		height: 100%;
		gap: 3px;
	}
	.markers:hover {
		cursor: pointer;
	}

	.thumb-indicator {
		--scale: 1;
		pointer-events: none;
		opacity: 0;

		top: 0;
		width: 10px;
		height: 10px;
		z-index: 100;
		transform: translate(0%, 0%) scale(var(--scale));
		left: calc(var(--progress-position) * 100%);
		border-radius: 50%;
		position: relative;
		transition: transform 150ms ease-in-out;
		aspect-ratio: 1/1;
		background-color: var(--white);
	}

	.progress-wrapper:hover :global(.timestamp-marker) {
		opacity: 1;
		z-index: 20;
	}

	.progress-wrapper:hover .thumb-indicator,
	.progress-wrapper:active .thumb-indicator {
		--scale: 2;
		opacity: 1;
	}
</style>
