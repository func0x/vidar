export function trapFocus(node) {
	const previous = document.activeElement;

	function focusable() {
		return Array.from(
			node.querySelectorAll(
				'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
			)
		);
	}

	function handleKeydown(event) {
		if (event.key !== 'Tab' && event.key !== 'ArrowUp' && event.key !== 'ArrowDown') return;
		const current = document.activeElement;

		const elements = focusable();
		const first = elements.at(0);
		const last = elements.at(-1);

		if (event.key === 'Tab') {
			if (event.shiftKey && current === first) {
				last.focus();
				event.preventDefault();
			}

			if (!event.shiftKey && current === last) {
				first.focus();
				event.preventDefault();
			}
		} else if (event.key === 'ArrowUp') {
			const prevIndex = elements.indexOf(current) - 1;
			const prev = elements[prevIndex >= 0 ? prevIndex : elements.length - 1];
			prev.focus();
			event.preventDefault();
		} else if (event.key === 'ArrowDown') {
			const nextIndex = elements.indexOf(current) + 1;
			const next = elements[nextIndex < elements.length ? nextIndex : 0];
			next.focus();
			event.preventDefault();
		}
	}

	focusable()[0]?.focus();

	node.addEventListener('keydown', handleKeydown);

	return {
		destroy() {
			node.removeEventListener('keydown', handleKeydown);
			previous?.focus();
		}
	};
}
