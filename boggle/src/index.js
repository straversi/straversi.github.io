console.log("hello, boggle!");

import {Cube} from "./customElements/cube.js";
import {WordBox} from "./customElements/word-box.js";
import {BoggleBoard} from "./customElements/boggle-board.js";
import {SolveButton} from "./customElements/solve-button.js";

async function solve(board) {
  console.log("sending board:", board);
  // return ["words", "were", "found", "by", "the", "algorithm", "how", "cool"];

  // board = [["A","B","C","D"],["E","F","G","H"],["I","J","K","L"],["M","N","O","P"]];
  const body = {board: board};
  const request = new Request("https://api.steven.codes/boggle/solve", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // Important: must stringify entire body, or else JSON will
    // be unreadable by Flask
    body: JSON.stringify(body)
  });
  const result = await fetch(request);
  return await result.json();
}

function displayWords(words) {
  let wordBox = document.querySelector("WORD-BOX");
  wordBox.words = words.map(w => ({word: w, points: 2}));
}

function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.getElementsByTagName("solve-button")[0].addEventListener("click", async function() {
  this.classList.add("clicked");
  let board = document.getElementsByTagName("BOGGLE-BOARD")[0];
  // const [results] = await Promise.all([
  //   solve(board.board()),
  //   timeout(800), // amount of time SOLVE-BUTTON takes to hide itself.
  // ]);
  const results = await solve(board.board());
  displayWords(results);
  document.body.classList.add('solved');
  console.log("solved.");
});
