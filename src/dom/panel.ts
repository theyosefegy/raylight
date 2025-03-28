import { Button } from "./button";

export class Panel {
	container: HTMLDivElement;

	constructor() {
		this.container = this.createContainer();
		document.body.appendChild(this.container);
	}

	private createContainer(): HTMLDivElement {
		const container = document.createElement("div");
		container.classList.add("raypanel");

		return container;
	}

	hide() {
		this.container.style.display = "none";
	}

	show() {
		const selection = window.getSelection();
		if (!selection || selection?.isCollapsed) return;

		const range = selection.getRangeAt(0);
		const rects = range.getClientRects();
		if (!rects.length) return;

		// The anchorOffset denotes the "start" of the selection, where the selection was initiated,
		// while the focusOffset denotes the "end" of the selection
		const isLTR = selection.anchorOffset <= selection.focusOffset;
		const rect = isLTR ? rects[rects.length - 1] : rects[0];

		const x = isLTR
			? rect.right - (parseFloat(this.container.style.width) || 65) / 2
			: rect.left;

		const y = rect.top - rect.height - 20;

		this.container.style.left = `${x + window.scrollX}px`;
		this.container.style.top = `${y + window.scrollY}px`;
		this.container.style.display = "flex";
	}

	add(...buttons: Button[]) {
		const fragment = document.createDocumentFragment();
		buttons.forEach((btn) => {
			btn.panel = this;
			fragment.appendChild(btn.element);
		});
		this.container.appendChild(fragment);
	}

	remove(button: Button) {
		this.container.removeChild(button.element);
	}
}
