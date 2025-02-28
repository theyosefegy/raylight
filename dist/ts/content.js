"use strict";
function getSelection() {
    const selection = window.getSelection();
    if ((selection === null || selection === void 0 ? void 0 : selection.rangeCount) == 0 && !selection)
        return;
    const range = selection === null || selection === void 0 ? void 0 : selection.getRangeAt(0);
    return range;
}
document.addEventListener("mouseup", (e) => {
    const range = getSelection();
    if (!range)
        return;
    const highlight = document.createElement("span");
    highlight.classList.add("rayhighlight");
    range.surroundContents(highlight);
});
