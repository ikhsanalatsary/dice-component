// Unicode 0x2680-0x2685 untuk setiap simbol dadu (⚀⚁⚂⚃⚄⚅). dalam angka hexadecimal -->
// lihat di https://www.fileformat.info/info/unicode/char/2680/index.htm
// dan https://graphemica.com/characters/tags/dice

import { invariant, getRandomFace } from "../util.js";

class Dice extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.innerHTML = `
      <template>
        <style>
          #dice {
             font-size: ${this.getAttribute("size") || "200px"};
             max-height: 200px;
             top: -20px;
             position: relative;
          }
        </style>
        <div id="dice"></div>
      </template>
    `;
    let template = this.querySelector("template");
    this._clone = template.content.cloneNode(true);
    this.shadowRoot.appendChild(this._clone);
  }

  connectedCallback() {
    this._init();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "face") {
      if (oldValue && oldValue !== newValue) {
        let value = Number(newValue);
        if (this._isValidFace(value)) {
          let face = this._getFace(value);
          let dice = this.shadowRoot.querySelector("#dice");
          dice.textContent = face;
          dice.setAttribute(
            "style",
            `color: hsl(${face.charCodeAt(0) * 60}, 70%, 50%)`
          );
        } else {
          invariant(
            `You are trying to pass ${newValue} to face attribute which is invalid. The face should be from 1 to 6`
          );
        }
      }
    }
    if (name === "size") {
      let dice = this.shadowRoot.querySelector("#dice");
      dice.setAttribute("style", `font-size: ${newValue}`);
    }
  }

  static get observedAttributes() {
    return ["face", "size"];
  }

  _getFace(value) {
    let newValue = 0x267f + value;
    let face = String.fromCodePoint(newValue);

    return face;
  }

  _isValidFace(value) {
    if (Number.isNaN(value)) return false;
    return value >= 1 && value <= 6;
  }

  _init() {
    let dice = this.shadowRoot.querySelector("#dice");
    let oneToSix = getRandomFace();
    let randomFace = this._getFace(oneToSix);
    if (this.hasAttribute("face")) {
      let value = Number(this.getAttribute("face"));
      if (this._isValidFace(value)) {
        let face = this._getFace(value);
        dice.textContent = face;
        dice.setAttribute(
          "style",
          `color: hsl(${face.charCodeAt(0) * 60}, 70%, 50%)`
        );
      } else {
        invariant(
          `You are trying to pass ${this.getAttribute(
            "face"
          )} to face attribute which is invalid. The face should be from 1 to 6`,
          `So, We change that to ${oneToSix}`
        );
        dice.textContent = randomFace;
        dice.setAttribute(
          "style",
          `color: hsl(${randomFace.charCodeAt(0) * 60}, 70%, 50%)`
        );
      }
    } else {
      dice.textContent = randomFace;
      dice.setAttribute(
        "style",
        `color: hsl(${randomFace.charCodeAt(0) * 60}, 70%, 50%)`
      );
    }
  }
}

customElements.define("uno-dice", Dice);
