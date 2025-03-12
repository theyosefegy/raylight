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

	add(...buttons: Button[]) {
		if (buttons.length === 1) {
			this.buttons.push(buttons[0]);
			this.container.appendChild(buttons[0].element);
			return;
		}

		for (let btn of buttons) {
			this.buttons.push(btn);
			this.container.appendChild(btn.element);
		}
	}

	remove(button: Button) {
		this.buttons = this.buttons.filter((b) => b !== button);
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
		btn.addEventListener("click", () => {
			this.callback();
		});
		return btn;
	}
}
