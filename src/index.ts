import { Panel, Button } from "./dom/panel";

function getSelectedRange(): Range | undefined {
	const selectedRange = window.getSelection();
	if (!selectedRange || selectedRange.rangeCount === 0) return;
	return selectedRange.getRangeAt(0);
}

const panel = new Panel();

const ItalicSVG = `<svg height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M216-192v-96h160l124-384H336v-96h408v96H596L472-288h152v96H216Z"/></svg>`;
const BoldSVG = `<svg height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M266-192v-576h227.95q67.05 0 123.55 41.32Q674-685.35 674-612q0 51-22.5 79.5T609-490.96Q635-479 665-448t30 91q0 91-67.03 128t-125.81 37H266Zm127-118h104.68Q546-310 556-334.5t10-35.5q0-11-10.5-35.5T494-430H393v120Zm0-232h93q33 0 48.5-17.5T550-597q0-24-17.11-39t-44.28-15H393v109Z"/></svg>`;
const StrikeSVG = `<svg height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M96-408v-72h768v72H96Zm336-144v-120H240v-96h480v96H528v120h-96Zm0 360v-144h96v144h-96Z"/></svg>`;
const HighlightSVG = `<svg height="20px" viewBox="0 -960 960 960" width="20px" fill="#e3e3e3"><path d="M456-96q-29.7 0-50.85-21.15Q384-138.3 384-168v-167H264q-29.7 0-50.85-21.15Q192-377.3 192-407v-265q0-61 42-102.5T336-816h432v409q0 29.7-21.5 50.85Q725-335 696-335H576v167q0 29.7-21.5 50.85Q533-96 504-96h-48ZM264-552h432v-192h-48v144h-72v-144h-48v73h-72v-73H336q-29.7 0-50.85 20.5Q264-703 264-672v120Zm0 145h432v-73H264v73Zm0 0v-73 73Z"/></svg>`;

function logTest() {
	console.log("test");
}

const italicBtn = new Button(ItalicSVG, logTest);
const BoldBtn = new Button(BoldSVG, logTest);
const StrikeBtn = new Button(StrikeSVG, logTest);
const HighlightBtn = new Button(HighlightSVG, logTest);

panel.add(BoldBtn, italicBtn, StrikeBtn, HighlightBtn);

// EVENTS

document.addEventListener("keydown", (e) => {
	if (!e.shiftKey) return;

	const selection = window.getSelection();
	if (!selection || selection?.isCollapsed) return;

	const range = selection.getRangeAt(0);
	const rects = range.getClientRects();
	if (!rects.length) return;

	const isLTR = selection.anchorOffset <= selection.focusOffset;
	const rect = isLTR ? rects[rects.length - 1] : rects[0];

	const x = isLTR
		? rect.right - (parseFloat(panel.container.style.width) || 65) / 2
		: rect.left;

	const y = rect.top - rect.height - 10;

	panel.show(x, y);
});

document.addEventListener("mousedown", (e) => {
	if (!panel.container.contains(e.target as Node)) {
		panel.hide();
	}
});
