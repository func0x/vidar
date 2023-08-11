<script>
	import { css } from '@emotion/css';
	let ref;
	let barWatched;
	let barLeft;
	let barPreview;

	export let timestamp;
	export let duration;
	export let currentTime;
	export let previewTime;
	export let timeMove;
	export let position;

	let boxCss;
	console.log(ref);

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

	$: {
		if (position > 5) {
			boxCss = css`
				left: ${position}px;
				position: relative;
				width: fit-content;
			`;
		}

		if (barWatched && barLeft) {
			const safeCurrentTime = isNaN(currentTime) ? 0 : currentTime;

			// TODO:
			// Refactor! The if cases wre created by checking all possible combinations.
			// This can be simplified.
			if (safeCurrentTime <= timestamp.from) {
				if (previewTime <= timestamp.from) {
					barWatched.style.flex = '0';
					barLeft.style.flex = '1';
					barPreview.style.flex = '0';
				} else if (previewTime >= timestamp.to) {
					barWatched.style.flex = '0';
					barLeft.style.flex = '0';
					barPreview.style.flex = '1';
				} else if (previewTime >= timestamp.from && previewTime <= timestamp.to) {
					const previewPercentage =
						(previewTime - timestamp.from) / (timestamp.to - timestamp.from);
					barWatched.style.flex = '0';
					barLeft.style.flex = `${1 - previewPercentage}`;
					barPreview.style.flex = `${previewPercentage}`;
				}
			} else if (safeCurrentTime >= timestamp.to) {
				if (previewTime <= timestamp.from) {
					barWatched.style.flex = '1';
					barLeft.style.flex = '0';
					barPreview.style.flex = '0';
				} else if (previewTime >= timestamp.to) {
					barWatched.style.flex = '1';
					barLeft.style.flex = '0';
					barPreview.style.flex = '0';
				} else if (previewTime >= timestamp.from && previewTime <= timestamp.to) {
					barWatched.style.flex = '1';
					barLeft.style.flex = '0';
					barPreview.style.flex = '0';
				}
			} else if (safeCurrentTime >= timestamp.from && safeCurrentTime <= timestamp.to) {
				if (previewTime <= timestamp.from) {
					const watchedPercentage =
						(safeCurrentTime - timestamp.from) / (timestamp.to - timestamp.from);
					barWatched.style.flex = `${watchedPercentage}`;
					barLeft.style.flex = `${1 - watchedPercentage}`;
					barPreview.style.flex = '0';
				} else if (previewTime >= timestamp.to) {
					const watchedPercentage =
						(safeCurrentTime - timestamp.from) / (timestamp.to - timestamp.from);
					barWatched.style.flex = `${watchedPercentage}`;
					barLeft.style.flex = '0';
					barPreview.style.flex = `${1 - watchedPercentage}`;
				} else if (previewTime >= timestamp.from && previewTime <= timestamp.to) {
					const watchedPercentage =
						(safeCurrentTime - timestamp.from) / (timestamp.to - timestamp.from);
					const previewPercentage =
						(previewTime - timestamp.from) / (timestamp.to - timestamp.from);
					barWatched.style.flex = `${watchedPercentage}`;
					if (previewPercentage < watchedPercentage) {
						barLeft.style.flex = `${1 - watchedPercentage}`;
						barPreview.style.flex = `0`;
					} else {
						barLeft.style.flex = `${1 - previewPercentage}`;
						barPreview.style.flex = `${previewPercentage - watchedPercentage}`;
					}
				}
			}
		}
	}
</script>

<div class="general-marker timestamp-marker" style={`flex: ${timestamp.to - timestamp.from} 0 0;`}>
	<div class={`timestamp-marker__tooltip ${boxCss} `}>
		<span>{timestamp.title}</span><span>{formatDuration(timeMove)}</span>
	</div>
	<div class="bars">
		<div class="timestamp-marker__bar timestamp-marker__bar--watched" bind:this={barWatched} />
		<div class="timestamp-marker__bar timestamp-marker__bar--preview" bind:this={barPreview} />
		<div class="timestamp-marker__bar timestamp-marker__bar--left" bind:this={barLeft} />
	</div>
</div>

<style>
	.timestamp-marker {
		display: grid;
	}
	.timestamp-marker > * {
		grid-column: 1;
		grid-row: 1;
	}
	.bars {
		display: flex;
		align-items: center;
	}
	.timestamp-marker__bar {
		height: 3px;

		width: 100%;
	}

	.timestamp-marker:hover .timestamp-marker__bar,
	.timestamp-marker:active .timestamp-marker__bar {
		height: 6px;
	}

	.timestamp-marker__bar--watched {
		background-color: var(--red);
		flex: 0;
	}

	.timestamp-marker__bar--left {
		background-color: rgba(255, 255, 255, 0.35);
		flex: 1;
	}

	.timestamp-marker__bar--preview {
		background-color: rgba(255, 255, 255, 0.6);
		flex: 0;
	}
	.timestamp-marker__tooltip {
		pointer-events: none;
		text-align: center;
		transform: translate(-50%, calc(-100% - 5px));
		opacity: 0;
		display: flex;
		flex-direction: column;
		gap: 3px;

		color: white;
	}

	.timestamp-marker:hover .timestamp-marker__tooltip {
		opacity: 1;
	}
</style>
