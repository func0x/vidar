<script>
	import play from '$lib/images/play.svg';
	import pause from '$lib/images/pause.svg';
	import fullscreen from '$lib/images/fullscreen.svg';
	import closeFullScreen from '$lib/images/exit_fullscreen.svg';
	import playback from '$lib/images/playback_speed.svg';
	import Volume from './Volume.svelte';

	export let videoContainer;
	export let video;
	export let currentTime;
	export let totalTime;
	export let duration;
	export let slider;
	export let volumeBtn;
	let fullScreenIcon;
	let playbackListOpen = false;
	let videoSpeed = [
		{ key: '0.25', value: 0.25 },
		{ key: '0.50', value: 0.5 },
		{ key: '0.75', value: 0.75 },
		{ key: 'Normal', value: 1 },
		{ key: '1.25', value: 1.25 },
		{ key: '1.50', value: 1.5 },
		{ key: '1.75', value: 1.75 },
		{ key: '2.00', value: 2 }
	];

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

	const changeSpeed = (e) => {
		playbackListOpen = !playbackListOpen;
		const value = e.target.getAttribute('value');

		if (value) {
			video.playbackRate = parseFloat(value);
		}
	};

	const toggleFullscreen = () => {
		if (document.fullscreenElement == null) {
			videoContainer.requestFullscreen();
			fullScreenIcon.src = closeFullScreen;
		} else {
			document.exitFullscreen();
			fullScreenIcon.src = fullscreen;
		}
	};
</script>

<div class="controls">
	<button class="play-pause-btn" on:click={togglePlay}>
		<img class="play-icon" src={play} alt="play" />
		<img class="pause-icon" src={pause} alt="pause" />
	</button>
	<Volume bind:slider bind:volumeBtn {video} />
	<div class="duration-container">
		<div bind:this={currentTime} class="current-time">0:00</div>
		/
		<div bind:this={totalTime} class="total-time">
			{duration ? formatDuration(duration) : '0:00'}
		</div>
	</div>
	<button on:click={changeSpeed} class="speed-btn wide">
		<img src={playback} alt="play" />
		{#if playbackListOpen}
			<div class="playback-choose">
				{#each videoSpeed as speed}
					<div class="video-speed" value={speed.value}>
						{speed.key}
					</div>
				{/each}
			</div>
		{/if}
		<div class="info">Playback Speed</div>
	</button>
	<button on:click={toggleFullscreen} class="full-screen-btn"
		><img bind:this={fullScreenIcon} class="full-screen" src={fullscreen} alt="full-screen" />

		<div class="info fullscreen">Full Screen</div>
	</button>
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
		position: relative;
	}

	div {
		color: white;
	}

	.controls {
		display: flex;
		gap: 1rem;
		align-items: center;
		height: 50px;
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

	.speed-btn {
		width: 50px;
		color: white;
	}

	.playback-choose {
		position: absolute;
		bottom: 200%;
		border-radius: 5px;
		overflow: hidden;
		background: #212121;
		z-index: 10;
	}

	.video-speed {
		width: 95px;
		padding: 6px 0;
		text-align: center;
		background: #212121;
		font-size: 10px;
	}

	.video-speed:hover {
		background-color: rgba(255, 255, 255, 0.15);
	}

	.playback-choose:first-child {
		border-radius: 5px;
	}

	.info {
		position: absolute;
		display: none;
		bottom: 200%;
		white-space: nowrap;
		width: fit-content;
		background: #212121;
		padding: 6px;
		border-radius: 5px;
		font-size: 12px;
		pointer-events: none;
	}

	button:hover > .info {
		display: block;
	}

	.fullscreen {
		right: 0;
	}

	@media screen and (max-width: 1115px) {
		.controls {
			gap: 0.5rem;
		}
	}
</style>
