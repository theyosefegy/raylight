"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Button = exports.Panel = void 0;
class Panel {
    constructor() {
        this.buttons = [];
        this.visible = false;
        this.container = this.createContainer();
        document.body.appendChild(this.container);
    }
    createContainer() {
        const container = document.createElement("div");
        container.classList.add("ray-panel");
        return container;
    }
    hide() {
        this.container.style.display = "none";
    }
    show(x, y) {
        this.container.style.left = `${x + window.scrollX}px`;
        this.container.style.top = `${y + window.scrollY}px`;
        this.container.style.display = "flex";
    }
    add(button) {
        this.buttons.push(button);
        this.container.appendChild(button.element);
    }
    remove(button) {
        this.buttons = this.buttons.filter((b) => b !== button);
        this.container.removeChild(button.element);
    }
}
exports.Panel = Panel;
class Button {
    constructor(title, callback) {
        this.title = title;
        this.onClick = callback;
        this.element = this.createElement();
    }
    createElement() {
        const btn = document.createElement("button");
        btn.classList.add("panel-btn");
        btn.innerHTML = this.title;
        btn.addEventListener("click", this.onClick);
        return btn;
    }
}
exports.Button = Button;
