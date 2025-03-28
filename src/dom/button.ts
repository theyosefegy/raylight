import { Panel } from "./panel";

export const styleMap = new Map<string, Partial<CSSStyleDeclaration>>([
	["bold", { fontWeight: "900" }],
	["italic", { fontStyle: "italic" }],
	["strikethrough", { textDecoration: "line-through" }],
	["underline", { textDecoration: "underline" }],
	["highlight", { background: "red" }],
]);

function surroundText(selected: Range, style?: Partial<CSSStyleDeclaration>) {
	const span = document.createElement("span");
	span.classList.add("raystyle");

	if (style) Object.assign(span.style, style);

	selected.surroundContents(span);
}

export class Button {
	title: string;
	element: HTMLButtonElement;
	panel: Panel | undefined;

	constructor(title: string) {
		this.title = title;
		this.element = this.createElement();
		this.panel = undefined;
	}

	private createElement(): HTMLButtonElement {
		const btn = document.createElement("button");
		btn.classList.add("panelbtn");

		const style = styleMap.get(this.title.toLowerCase());

		btn.innerHTML = style ? this.title[0].toUpperCase() : "Unknown";
		if (style) Object.assign(btn.style, style);

		btn.addEventListener("click", () => {
			const selectedText = window.getSelection();

			if (!selectedText) return;

			const selectedRange = selectedText.getRangeAt(0);

			this.panel?.hide();
			selectedText.collapse(document.body);
			this.handle(selectedRange);
		});

		return btn;
	}

	handle(selectedText?: Range): void {}
}

export class StyleButton extends Button {
	constructor(title: string) {
		super(title);
	}

	handle(selectedText?: Range): void {
		const style = styleMap.get(this.title.toLowerCase());
		if (!selectedText || !style) return;

		surroundText(selectedText, style);
	}
}
