console.log("hello, boggle!");

import {Cube} from "./customElements/cube.js";
import {WordBox} from "./customElements/word-box.js";
import {BoggleBoard} from "./customElements/boggle-board.js";
import {SolveButton} from "./customElements/solve-button.js";

async function solve(board) {
  console.log("sending board:", board);
  return ["words", "were", "found"];

  // let board = [["A","B","C","D"],["E","F","G","H"],["I","J","K","L"],["M","N","O","P"]];
  let body = {board: board};
  let request = new Request("/boggle/solve", {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    // Important: must stringify entire body, or else JSON will
    // be unreadable by Flask
    body: JSON.stringify(body)
  });
  let result = await fetch(request);
  return await result.json();
}

function displayWords(words) {
  console.log(words);
}

document.getElementsByTagName("solve-button")[0].addEventListener("click", function() {
  this.classList.add("clicked");
  let board = document.getElementsByTagName("BOGGLE-BOARD")[0];
  console.log('loaded this');
  solve(board.board())
    .then((results) => {
      displayWords(results);
      return results;
    })
    .then(() => {
      console.log("promise chain over, bitch")
    });
});
