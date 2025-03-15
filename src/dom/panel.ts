export class Panel {
	container: HTMLDivElement;

	constructor() {
		this.container = this.createContainer();
		document.body.appendChild(this.container);
	}

	private createContainer(): HTMLDivElement {
		const container = document.createElement("div");
		container.classList.add("ray-panel");

		return container;
	}

	hide() {
		this.container.style.display = "none";
	}

	show(x: number, y: number) {
		this.container.style.left = `${x + window.scrollX}px`;
		this.container.style.top = `${y + window.scrollY}px`;
		this.container.style.display = "flex";
	}

	add(...buttons: Button[]) {
		const fragment = document.createDocumentFragment();
		buttons.forEach((btn) => fragment.appendChild(btn.element));
		this.container.appendChild(fragment);
	}

	remove(button: Button) {
		this.container.removeChild(button.element);
	}
}

export class Button {
	title: string;
	callback: Function;
	element: HTMLButtonElement;

	constructor(title: string, callback: Function) {
		this.title = title;
		this.callback = callback;
		this.element = this.createElement();
	}

	private createElement(): HTMLButtonElement {
		const btn = document.createElement("button");
		btn.classList.add("panel-btn");
		btn.innerHTML = this.title;
		btn.addEventListener("click", () => this.callback());
		return btn;
	}
}
