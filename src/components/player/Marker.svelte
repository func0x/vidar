<script>
	import { onMount } from 'svelte';

	let ref;

	export let timestamp;
	export let duration;
	let wrapper;

	onMount(() => {
		wrapper = document.querySelector('.progress-wrapper');
		window.addEventListener('resize', () => {
			if (ref && wrapper) {
				const width = ((timestamp.to - timestamp.from) / duration) * wrapper.clientWidth;

				ref.style.width = `${width}px`;
			}
		});
	});

	$: {
		if (wrapper && ref) {
			const width = ((timestamp.to - timestamp.from) / duration) * wrapper.clientWidth;

			ref.style.width = `${width}px`;
		}
	}
</script>

<div bind:this={ref} marker-tooltip={timestamp.title} class="general-marker timestamp-marker" />

<style>
	.timestamp-marker {
		position: sticky;
		height: 3px;
		z-index: 5;
		background-color: var(--red);
		opacity: 0;
	}

	.timestamp-marker:hover {
		height: 6px;
		transform: translate(0, -37.5%);
	}

	[marker-tooltip]:before {
		width: fit-content;
		content: attr(marker-tooltip);
		position: absolute;
		opacity: 0;
		bottom: 100%;
		left: 50%;
		transform: translateX(-50%);
		white-space: nowrap;
		transition: all 0.15s ease;
		padding: 3px;
		color: white;
		overflow: hidden;
	}

	[marker-tooltip]:hover:before,
	[marker-tooltip]:active:before {
		opacity: 1;
		background: transparent;
	}
</style>
