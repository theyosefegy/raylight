"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Panel_js_1 = require("./dom/Panel.js");
function getSelectedRange() {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0)
        return;
    return selection.getRangeAt(0);
}
const panel = new Panel_js_1.Panel();
const btn1 = new Panel_js_1.Button("I", () => console.log("Italic Clicked!"));
const btn2 = new Panel_js_1.Button("B", () => console.log("Bold Clicked!"));
const btn3 = new Panel_js_1.Button("H", () => console.log("Highlight Clicked!"));
panel.add(btn1);
panel.add(btn2);
panel.add(btn3);
document.addEventListener("mouseup", (e) => {
    const selectedRange = getSelectedRange();
    const rect = selectedRange === null || selectedRange === void 0 ? void 0 : selectedRange.getClientRects()[0];
    if (!rect || (selectedRange === null || selectedRange === void 0 ? void 0 : selectedRange.toString().trim()) === "")
        return;
    if (e.target == panel.container || e)
        panel.show(rect.right, rect.bottom);
});
document.addEventListener("mousedown", (e) => {
    if (!panel.container.contains(e.target)) {
        panel.hide();
    }
});
