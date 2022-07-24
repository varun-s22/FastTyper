const getText = require("./getText");

async function typing() {
  const textDiv = document.querySelector(".Text");
  let textToWrite = await getText(300);
  const appDiv = document.querySelector(".App");
  let newInput = document.createElement("input");
  let textMaterial = textToWrite.text;
  let numOfWords = textMaterial.split(" ");
  let letterArr = numOfWords
    .map((word) => word + " ")
    .map((word) => word.split(""))
    .flat();
  let newDiv = document.createElement("div");
  for (let letter of letterArr) {
    let span = document.createElement("span");
    span.innerText = letter;
    newDiv.append(span);
  }
  textDiv.append(newDiv);
  appDiv.append(newInput);
  newInput.focus();
  newInput.style.position = "absolute";
  newInput.style.top = "-99999em";
  newInput.style.left = "-99999em";

  let correctLetters = 0;
  newInput.addEventListener("keypress", (e) => {
    let keyPressed = e.key;
    let spanElements = document.querySelectorAll("span");
    if (spanElements[correctLetters].innerText === keyPressed) {
      spanElements[correctLetters].classList.add("correct");
      correctLetters++;
    }
  });
}
module.exports = typing;
