<script>
	import play from '$lib/images/play.svg';
	import pause from '$lib/images/pause.svg';
	import checkmark from '$lib/images/checkmark.svg';
	import fullscreen from '$lib/images/fullscreen.svg';
	import closeFullScreen from '$lib/images/exit_fullscreen.svg';
	import playback from '$lib/images/playback_speed.svg';
	import Volume from './Volume.svelte';
	import { onMount } from 'svelte';

	export let videoContainer;
	export let video;
	export let currentTime;
	export let totalTime;
	export let duration;
	export let slider;
	export let volumeBtn;
	export let fullScreenIcon;
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

	const openPlaybackModal = (e) => {
		playbackListOpen = !playbackListOpen;
		if (playbackListOpen) {
			document.querySelector('.playback-choose').style.display = 'block';
		} else {
			document.querySelector('.playback-choose').style.display = 'none';
		}
	};

	const changeSpeed = (e) => {
		const value = e.target.getAttribute('value');

		if (playbackListOpen && value) {
			const speeds = document.querySelectorAll('.video-speed');

			Object.entries(speeds).forEach(([_, value]) => {
				if (value === e.target) {
					value.firstElementChild.style.visibility = 'visible';
					value.lastElementChild.style.fontWeight = 'var(--font-bold)';
				} else {
					value.firstElementChild.style.visibility = 'hidden';
					value.lastElementChild.style.fontWeight = 'var(--font-light)';
				}
			});

			video.playbackRate = parseFloat(value);
			document.querySelector('.playback-choose').style.display = 'none';
			playbackListOpen = false;
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

	onMount(() => {
		document.querySelectorAll('.video-speed')[3].firstElementChild.style.visibility = 'visible';
		document.querySelectorAll('.video-speed')[3].lastElementChild.style.fontWeight =
			'var(--font-bold)';
		console.log(document.querySelectorAll('.video-speed')[3]);
	});
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
	<div class="playback-choose-wrapper">
		<div class="playback-choose" on:click={changeSpeed} on:keyup={changeSpeed}>
			{#each videoSpeed as speed}
				<div class="video-speed" value={speed.value}>
					<img class="checkmark" src={checkmark} alt="checkmark" />
					<span> {speed.key} </span>
				</div>
			{/each}
		</div>
		<button on:click={openPlaybackModal} class="speed-btn wide">
			<img src={playback} alt="play" />
			<div class="info">Playback Speed</div>
		</button>
	</div>
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

	span {
		pointer-events: none;
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

	img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}

	.speed-btn {
		width: 50px;
		color: white;
	}

	.playback-choose-wrapper {
		position: relative;
	}

	.playback-choose {
		display: none;
		position: absolute;
		transform: translateX(-25%);
		bottom: 200%;
		border-radius: 5px;
		overflow: hidden;
		background: #212121;
		z-index: 10;
	}

	.video-speed {
		width: 95px;
		display: grid;
		grid-template-areas: 'checkmark speed';
		grid-template-columns: repeat(auto-fill, minmax(20px, 1fr));
		align-items: center;
		padding: 6px 10px;
		text-align: center;
		background: #212121;
		font-size: 10px;
	}

	.checkmark {
		visibility: hidden;
		grid-area: checkmark;
		text-align: center;
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
