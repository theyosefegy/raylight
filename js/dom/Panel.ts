
export class Panel {
	buttons: Button[];
	visible: boolean;
	container: HTMLDivElement;

	constructor() {
		this.buttons = [];
		this.visible = false;
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

	add(button: Button) {
		this.buttons.push(button);
		this.container.appendChild(button.element);
	}

	remove(button: Button) {
		this.buttons = this.buttons.filter((b) => b !== button);
		this.container.removeChild(button.element);
	}
}

export class Button {
	title: string;
	onClick: () => void;
	element: HTMLButtonElement;

	constructor(title: string, callback: () => void) {
		this.title = title;
		this.onClick = callback;
		this.element = this.createElement();
	}

	private createElement(): HTMLButtonElement {
		const btn = document.createElement("button");
		btn.classList.add("panel-btn");
		btn.innerHTML = this.title;
		btn.addEventListener("click", this.onClick);
		return btn;
	}
}
