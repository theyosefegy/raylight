class Panel {
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

class Button {
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

function getSelectedRange(): Range | undefined {
	const selection = window.getSelection();
	if (!selection || selection.rangeCount === 0) return;
	return selection.getRangeAt(0);
}

const panel = new Panel();

const btn1 = new Button("I", () => console.log("Italic Clicked!"));
const btn2 = new Button("B", () => console.log("Bold Clicked!"));
const btn3 = new Button("H", () => console.log("Highlight Clicked!"));

panel.add(btn1);
panel.add(btn2);
panel.add(btn3);

document.addEventListener("mouseup", (e) => {
	const selectedRange = getSelectedRange();
	const rect = selectedRange?.getClientRects()[0];

	if (!rect || selectedRange?.toString().trim() === "") return;

	if (e.target == panel.container || e) panel.show(rect.right, rect.bottom);
});

document.addEventListener("mousedown", (e) => {
	if (!panel.container.contains(e.target as Node)) {
		panel.hide();
	}
});
