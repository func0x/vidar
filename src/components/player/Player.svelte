<script>
	import MediaQuery from 'src/hooks/UseMediaQuery.svelte';
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
	let currentTime;
	let totalTime;
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

	let currentPercent;

	const currentTimeVideo = () => {
		currentTime.textContent = formatDuration(video.currentTime);
		currentPercent = video.currentTime / video.duration;
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
		<MediaQuery query="(min-width: 1115px)" let:matches>
			{#if matches}
				<Box df gap="var(--gap-xl)" width="fit-content" height="fit-content" bg="transparent" ch>
					<img src={noVideo} alt="no-video" />
					<span>VIDEO NOT YET AVAILABLE</span>
				</Box>
			{:else}
				<Box
					df
					fd="column"
					gap="var(--gap-xl)"
					width="fit-content"
					height="fit-content"
					bg="transparent"
					ch
				>
					<img src={noVideo} alt="no-video" />
					<span>VIDEO NOT YET AVAILABLE</span>
				</Box>
			{/if}
		</MediaQuery>
	</Box>
{:else}
	<div class="video-section-container">
		<div class="gradient" />
		<div
			bind:this={videoContainer}
			on:fullscreenchange={toggleFullscreen}
			class="video-container paused"
		>
			<div class="video-controls-container">
				<Timeline {duration} {video} timestamps={event.video.timestamps} {currentPercent} />
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
		height: 100%;
		width: 100%;
	}
	span {
		color: var(--white);
		font-size: var(--font-xl);
		text-align: center;
	}

	.video-section-container {
		width: 100%;

		background-color: black;
		display: grid;

		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.video-section-container > * {
		grid-column: 1;
		grid-row: 1;
	}

	.gradient {
		z-index: 2;
		background: linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, transparent 30%);
	}

	.video-container {
		font-size: var(--font-m);

		height: 720px;
		display: flex;
		position: relative;
		justify-content: center;
	}

	.video-controls-container {
		height: fit-content;
		position: absolute;
		padding: 0 1.25rem;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 3;
		opacity: 1;
		transition: opacity 150ms ease-in-out;
		grid-area: controls;
	}

	.video-container:hover .video-controls-container,
	.video-container:focus-within .video-controls-container,
	.video-container:active .video-controls-container,
	.video-container:focus-within .video-controls-container {
		opacity: 1;
	}

	@media screen and (max-width: 1115px) {
		video {
			display: flex;
		}

		.video-container {
			height: 520px;
		}
	}

	@media screen and (max-width: 700px) {
		video {
			height: 345px;
		}

		.video-container {
			height: 375px;
			font-size: var(--font-s);
		}
	}
</style>
