import { Panel } from "./dom/panel";
import { StyleButton } from "./dom/button";

const panel = new Panel();

const BoldBtn = new StyleButton("bold");
const italicBtn = new StyleButton("Italic");
const underlineBtn = new StyleButton("underline");
const strikeBtn = new StyleButton("strikethrough");
const highlightBtn = new StyleButton("highlight");

panel.add(BoldBtn, italicBtn, underlineBtn, strikeBtn, highlightBtn);

// EVENTS

document.addEventListener("keydown", (e) => {
	if (!e.shiftKey) return;
	panel.show();
});

document.addEventListener("click", (e) => {
	if (!panel.container.contains(e.target as Node)) {
		panel.hide();
	}
});
