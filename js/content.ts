import { Panel, Button } from "./dom/Panel.js";

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
