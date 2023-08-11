<script>
	import play from '$lib/images/play.svg';
	import pause from '$lib/images/pause.svg';
	import fullscreen from '$lib/images/fullscreen.svg';
	import Volume from './Volume.svelte';

	export let videoContainer;
	export let video;
	export let currentTime;
	export let totalTime;
	export let duration;
	let speedBtn;

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

	const togglePlay = () => {
		video.paused ? video.play() : video.pause();
	};

	const changeSpeed = () => {
		let speed = video.playbackRate + 0.25;
		if (speed > 2) {
			speed = 0.25;
		}

		video.playbackRate = speed;
		speedBtn.textContent = `${speed}x`;
	};

	const toggleFullscreen = () => {
		if (document.fullscreenElement == null) {
			videoContainer.requestFullscreen();
		} else {
			document.exitFullscreen();
		}
	};
</script>

<div class="controls">
	<button class="play-pause-btn" on:click={togglePlay}>
		<img class="play-icon" src={play} alt="play" />
		<img class="pause-icon" src={pause} alt="pause" />
	</button>
	<Volume {video} />
	<div class="duration-container">
		<div bind:this={currentTime} class="current-time">0:00</div>
		/
		<div bind:this={totalTime} class="total-time">
			{duration ? formatDuration(duration) : '0:00'}
		</div>
	</div>
	<button bind:this={speedBtn} on:click={changeSpeed} class="speed-btn wide"> 1x </button>
	<button on:click={toggleFullscreen} class="full-screen-btn"
		><img class="full-screen" src={fullscreen} alt="full-screen" /></button
	>
</div>

<style>
	button {
		background: none;
		border: none;
		cursor: pointer;
		height: 30px;
		width: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: transparent;
	}

	div {
		color: white;
	}

	.controls {
		display: flex;
		gap: 1rem;
		padding: 1rem;
		align-items: center;
		height: 45px;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.controls button > img {
		box-sizing: unset;
		display: flex;
	}

	:global(.video-container.paused) .pause-icon {
		display: none;
	}

	:global(.video-container:not(.paused)) .play-icon {
		display: none;
	}

	.duration-container {
		gap: 0.25rem;
		flex-grow: 1;
		display: flex;
		align-items: center;
	}

	.controls button.wide {
		width: 50px;
		color: white;
	}

	@media screen and (max-width: 1115px) {
		.controls {
			gap: 0.5rem;
		}
	}
</style>
