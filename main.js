import "./components/Dice.js";
import { getRandomFace } from "./util.js";

window.addEventListener("DOMContentLoaded", function () {
  rollDice();
});

let rollButton = document.createElement("button");
rollButton.style.fontSize = "50px";
rollButton.textContent = "Roll";
document.querySelector(".wrapper").appendChild(rollButton);
let selectDice = (selector) => {
  let dice = document.querySelector(selector);
  dice.setAttribute("face", getRandomFace());
};
function rollDice() {
  selectDice("#face-1");
  selectDice("#face-2");
}
rollButton.addEventListener("click", function () {
  rollDice();
});
