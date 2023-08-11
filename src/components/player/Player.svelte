<script>
	import Box from 'src/components/Box.svelte';
	import noVideo from '$lib/images/no_video.svg';
	import volumeIcon from '$lib/images/volume.svg';
	import muteIcon from '$lib/images/mute.svg';
	import fullscreen from '$lib/images/fullscreen.svg';
	import closeFullScreen from '$lib/images/exit_fullscreen.svg';
	import Controls from './Controls.svelte';
	import Timeline from './Timeline.svelte';
	import { onMount } from 'svelte';

	export let event;

	let videoContainer;
	let video;
	let thumb;
	let currentTime;
	let totalTime;
	let progress;
	let duration;
	let slider;
	let volumeBtn;
	let fullScreenIcon;

	const togglePlay = () => {
		if (video) {
			video.paused ? video.play() : video.pause();
		}
	};

	const leadingZeroFormatter = new Intl.NumberFormat(undefined, {
		minimumIntegerDigits: 2
	});

	const formatDuration = (time) => {
		const seconds = Math.floor(time % 60);
		const minutes = Math.floor(time / 60) % 60;
		const hours = Math.floor(time / 3600);
		if (hours === 0) {
			return `${minutes}:${leadingZeroFormatter.format(seconds)}`;
		} else {
			return `${hours}:${leadingZeroFormatter.format(minutes)}:${leadingZeroFormatter.format(
				seconds
			)}`;
		}
	};

	const currentTimeVideo = () => {
		currentTime.textContent = formatDuration(video.currentTime);
		const percent = video.currentTime / video.duration;

		progress.value = percent;
		thumb.style.setProperty('--progress-position', percent);
	};

	const skip = (time) => {
		if (video) {
			video.currentTime += time;
		}
	};

	const changeVolume = (volume) => {
		if (video && slider) {
			if (video.volume + volume >= 0 && video.volume + volume <= 1) {
				video.volume += volume;
				slider.value = video.volume.toFixed(1);
			}

			if (parseFloat(slider.value) === 0.0) {
				volumeBtn.firstChild.src = muteIcon;
			} else {
				volumeBtn.firstChild.src = volumeIcon;
			}
		}
	};

	const toggleFullscreen = () => {
		if (document.fullscreenElement == null) {
			fullScreenIcon.src = fullscreen;
		} else {
			fullScreenIcon.src = closeFullScreen;
		}
	};

	const keyDownEvent = (event) => {
		const tagName = document.activeElement.tagName.toLowerCase();
		if (tagName === 'input') {
			return;
		}

		switch (event.key.toLowerCase()) {
			case 'arrowleft':
				skip(-10);
				break;
			case 'arrowright':
				skip(10);
				break;
			case ' ':
				event.preventDefault();
				togglePlay();
				break;
			case 'arrowup':
				event.preventDefault();
				changeVolume(0.1);
				break;
			case 'arrowdown':
				event.preventDefault();
				changeVolume(-0.1);
				break;

			default:
				break;
		}
	};

	onMount(() => {
		document.addEventListener('keydown', (event) => keyDownEvent(event));
	});
</script>

{#if event.video.title === ''}
	<Box height="720px" bg="black" cvh>
		<Box df gap="var(--gap-xl)" width="fit-content" height="fit-content" bg="transparent" ch>
			<img src={noVideo} alt="no-video" />
			<span>VIDEO NOT YET AVAILABLE</span>
		</Box>
	</Box>
{:else}
	<div class="video-section-container">
		<div
			bind:this={videoContainer}
			on:fullscreenchange={toggleFullscreen}
			class="video-container paused"
		>
			<div class="video-controls-container">
				<Timeline bind:progress bind:thumb {duration} {video} timestamps={event.video.timestamps} />
				<Controls
					{videoContainer}
					{video}
					bind:fullScreenIcon
					bind:slider
					bind:volumeBtn
					{duration}
					bind:currentTime
					bind:totalTime
				/>
			</div>
			<video
				bind:this={video}
				bind:duration
				on:click={togglePlay}
				on:timeupdate={currentTimeVideo}
				on:play={() => {
					videoContainer.classList.remove('paused');
				}}
				on:pause={() => {
					videoContainer.classList.add('paused');
				}}
				type="video/mp4"
				src={event.video.name}
			>
				<track kind="captions" />
			</video>
		</div>
	</div>
{/if}

<style>
	video {
		width: 100%;
		height: inherit;
	}
	span {
		color: var(--white);
		font-size: var(--font-xl);
		text-align: center;
	}

	.video-section-container {
		width: 100%;
		height: 720px;
		background-color: black;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
	}

	.video-container {
		font-size: var(--font-m);
		height: 720px;
	}

	.video-controls-container {
		position: absolute;
		height: fit-content;
		margin: 0 0.5rem;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 3;
		opacity: 1;
		transition: opacity 150ms ease-in-out;
	}

	.video-controls-container::before {
		content: '';
		position: absolute;
		bottom: 0;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
		width: 100%;
		aspect-ratio: 6/1;
		z-index: -1;
		pointer-events: none;
		margin-left: -0.5rem;
	}

	.video-container:hover .video-controls-container,
	.video-container:focus-within .video-controls-container,
	.video-container:active .video-controls-container,
	.video-container:focus-within .video-controls-container {
		opacity: 1;
	}

	@media screen and (max-width: 1115px) {
		.video-section-container {
			height: 575px;
		}

		.video-container {
			height: 575px;
		}

		video {
			height: 575px;
		}
	}

	@media screen and (max-width: 700px) {
		.video-container {
			height: 345px;
		}

		.video-section-container {
			height: 345px;
		}

		video {
			height: 345px;
		}

		.video-container {
			font-size: var(--font-s);
		}
	}
</style>
