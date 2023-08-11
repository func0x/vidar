<script>
	import Marker from './Marker.svelte';
	import { onMount } from 'svelte';

	export let progress;
	export let video;
	export let thumb;
	export let timestamps;
	export let duration;
	let wrapper;

	onMount(() => {
		wrapper = document.querySelector('.progress-wrapper');
	});

	const handleMove = (e) => {
		if (!video.duration) return;
		if (e.type !== 'touchmove' && !(e.buttons & 1)) return;

		const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;

		const { left, right } = wrapper.getBoundingClientRect();
		video.currentTime = (video.duration * (clientX - left)) / (right - left);

		const percent = (clientX - left) / (right - left);

		thumb.style.setProperty('--progress-position', percent);
	};

	const handleMousedown = () => {
		video.pause();
	};

	const handleMouseup = (e) => {
		const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
		const { left, right } = wrapper.getBoundingClientRect();
		video.currentTime = (video.duration * (clientX - left)) / (right - left);

		const percent = (clientX - left) / (right - left);

		thumb.style.setProperty('--progress-position', percent);
		setTimeout(function () {
			video.play();
		}, 150);
	};
</script>

<div
	class="progress-wrapper"
	on:mousemove={handleMove}
	on:touchmove|preventDefault={handleMove}
	on:mousedown={handleMousedown}
	on:mouseup={handleMouseup}
>
	<div bind:this={thumb} class="thumb-indicator" />
	<Marker {duration} timestamp={timestamps[0]} />
	<Marker {duration} timestamp={timestamps[1]} />
	<Marker {duration} timestamp={timestamps[2]} />
	<progress bind:this={progress} value="0.0" />
</div>

<style>
	progress {
		border: none;
		position: absolute;
		width: 100%;
		height: 3px;
		z-index: 10;
		background: var(--grey-300);
	}

	progress::-moz-progress-bar {
		background: var(--red);
	}

	progress::-webkit-progress-bar {
		background: var(--grey-300);
	}

	progress::-webkit-progress-value {
		background: var(--red);
	}

	.progress-wrapper {
		position: relative;
		display: flex;
		gap: 1px;
		height: 3px;
	}

	.thumb-indicator {
		--scale: 1;
		cursor: grab;
		top: 0;
		width: 10px;
		height: 10px;
		z-index: 100;
		transform: translate(-50%, -37.5%) scale(var(--scale));
		left: calc(var(--progress-position) * 100%);
		border-radius: 50%;
		position: absolute;
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
	}
</style>

