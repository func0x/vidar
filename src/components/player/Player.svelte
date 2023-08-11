<script>
	import Box from 'src/components/Box.svelte';
	import noVideo from '$lib/images/no_video.svg';
	import Controls from './Controls.svelte';
	import Timeline from './Timeline.svelte';

	export let event;

	let videoContainer;
	let video;
	let thumb;
	let currentTime;
	let totalTime;
	let progress;
	let duration;

	const togglePlay = () => {
		video.paused ? video.play() : video.pause();
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
		<div bind:this={videoContainer} class="video-container paused">
			<div class="video-controls-container">
				<Timeline bind:progress bind:thumb {duration} {video} timestamps={event.video.timestamps} />
				<Controls {videoContainer} {video} {duration} bind:currentTime bind:totalTime />
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
