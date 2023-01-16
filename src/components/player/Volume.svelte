<script>
	import volumeIcon from '$lib/images/volume.svg';
	import volumeLow from '$lib/images/volume_low.svg';
	import muteIcon from '$lib/images/mute.svg';

	export let video;
	export let slider;
	export let volumeBtn;
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

	function changeVolume() {
		const value = (this.value - this.min) / (this.max - this.min);
		this.style.background =
			'linear-gradient(to right, white 0%, white ' +
			value * 100 +
			'%, #595959 ' +
			value * 100 +
			'%, #595959 100%)';

		video.volume = value;

		if (video.volume === 0) {
			volumeBtn.firstChild.src = muteIcon;
		} else if (video.volume > 0 && video.volume < 0.6) {
			volumeBtn.firstChild.src = volumeLow;
		} else {
			volumeBtn.firstChild.src = volumeIcon;
		}
	}
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
	img {
		-webkit-user-drag: none;
		-khtml-user-drag: none;
		-moz-user-drag: none;
		-o-user-drag: none;
		user-drag: none;
	}
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
		height: 6px;
		transform-origin: left;
		transform: scaleX(0);
		accent-color: white;
		transition: width 150ms ease-in-out, transform 150ms ease-in-out;
		background: linear-gradient(to right, white 0%, white 100%, #595959 100%, #595959 100%);
	}

	.volume-container {
		display: flex;
		align-items: center;
	}
	.volume-container:hover .volume-slider,
	.volume-slider:focus-within {
		transform: scaleX(1);
		accent-color: white;
		height: 6px;
		border-radius: 2000px;
		border: 1px solid #928f94;
		width: 55px;
		outline: none;
		cursor: pointer;
		-webkit-appearance: none;
	}

	@media screen and (max-width: 1115px) {
		.volume-container .volume-slider {
			width: 55px;
			transform: scaleX(1);
		}
	}
</style>
