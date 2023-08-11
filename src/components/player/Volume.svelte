<script>
	import volumeIcon from '$lib/images/volume.svg';
	import muteIcon from '$lib/images/mute.svg';

	export let video;
	let volumeBtn;
	let slider;
	let volume;

	const muteVideo = () => {
		if (video.volume !== 0) {
			volume = video.volume;
			video.volume = 0;
			volumeBtn.firstChild.src = muteIcon;
			slider.value = 0;
		} else {
			video.volume = volume;
			volumeBtn.firstChild.src = volumeIcon;
			slider.value = volume;
		}
	};

	const changeVolume = (event) => {
		video.volume = event.target.value;

		if (video.volume === 0) {
			volumeBtn.firstChild.src = muteIcon;
		} else {
			volumeBtn.firstChild.src = volumeIcon;
		}
	};
</script>

<div class="volume-container">
	<button on:click={muteVideo} bind:this={volumeBtn} class="volume-btn"
		><img class="volume" src={volumeIcon} alt="volume" /></button
	>
	<input
		on:input={changeVolume}
		bind:this={slider}
		class="volume-slider"
		type="range"
		min="0"
		max="1"
		step="any"
		value="1"
	/>
</div>

<style>
	button {
		background: none;
		border: none;
		color: transparent;
		cursor: pointer;
		height: 30px;
		width: 30px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.volume-slider {
		width: 0;
		transform-origin: left;
		transform: scaleX(0);
		transition: width 150ms ease-in-out, transform 150ms ease-in-out;
	}

	.volume-container {
		display: flex;
		align-items: center;
	}
	.volume-container:hover .volume-slider,
	.volume-slider:focus-within {
		width: 50px;
		transform: scaleX(1);
	}

	[type='range'] {
		margin: 0;
		padding: 5px 0;
		background: transparent;
	}
	[type='range'],
	[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
	}
	[type='range']::-webkit-slider-runnable-track {
		box-sizing: border-box;
		border: none;
		height: 3px;
		background: white;
	}
	[type='range']::-moz-range-track {
		box-sizing: border-box;
		border: none;
		height: 3px;
		background: white;
	}
	[type='range']::-ms-track {
		box-sizing: border-box;
		border: none;
		height: 3px;
		background: white;
	}
	[type='range']::-webkit-slider-thumb {
		margin-top: -4.5px;
		box-sizing: border-box;
		border: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--red);
	}
	[type='range']::-moz-range-thumb {
		box-sizing: border-box;
		border: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--red);
	}
	[type='range']::-ms-thumb {
		margin-top: 0;
		box-sizing: border-box;
		border: none;
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: var(--red);
	}

	[type='range']::-ms-tooltip {
		display: none;
	}

	@media screen and (max-width: 1115px) {
		.volume-container .volume-slider {
			width: 50px;
			transform: scaleX(1);
		}
	}
</style>
