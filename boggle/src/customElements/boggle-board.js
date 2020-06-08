import {LitElement, html} from 'lit-element';
import {Cube} from "./cube.js";

export class BoggleBoard extends LitElement {

  static get properties() {
    return {

    }
  }

  // The initial cube width is just an estimate. Correct it when the
  // board loads.
  firstUpdated() {
    this.updateCubeWidth();
  }

  updateCubeWidth() {
    let board = this.shadowRoot.querySelector("#board");
    let cube = this.shadowRoot.querySelector("cube-");
    let width = cube.getBoundingClientRect().width;
    board.style.setProperty('--cube-width', width + "px");
  }

  constructor() {
    super();
    this.addEventListener("boggleCharacterEntered", (e) => {
      let cubes = Array.from(this.shadowRoot.querySelectorAll("CUBE-"));
      let cubeIndex = cubes.indexOf(e.originalTarget);
      if (cubeIndex !== cubes.length - 1) {
        cubes[cubeIndex + 1].focus();
      } else {
        document.querySelector("button#solve").focus();
      }
    });

    window.addEventListener('resize', () => this.updateCubeWidth());
  }

  board() {
    const cubes = this.shadowRoot.querySelectorAll("CUBE-");
    let board = [];
    let row = [];
    let i = 1;
    for (let cube of cubes) {
      row.push(cube.char);
      if (i % 4 === 0) {
        board.push(row);
        row = [];
      }
      i += 1;
    }
    return board;
  }

  style() {
    return html`<style>
      :host {
        display: block;
        position: relative;
      }
      #board {
        --cube-width: 80px;
        --cube-font-size: 67px;

        width: 100%;
        height: 100%;

        box-sizing: border-box;

        position: relative;

        /* Sets #board as the containing block for fixed position svg descendants */
        transform: translate(0px);
        overflow: visible;

        display: grid;
        grid-template-columns: repeat(4, 1fr);
        grid-template-rows: repeat(4, 1fr);
        grid-gap: 1em;
        padding: 1em;
      }


      CUBE- {
        transition: transform 0.1s ease-out;
        width: 100%;
        height: 100%;
        z-index: 2;
      }
      CUBE-:focus {
        z-index: 3;
        transform: scale(1.1);
      }
      svg#square {
        z-index: 2;
        position: fixed;
        top: 0px;
        left: 0px;
      }
      svg#cube-thing {
        z-index: 1;
        position: fixed;
        top: 0px;
        right: 0px;
      }
    </style>`
  }

  render() {
    return html`${this.style()}
      <div id="board">
        <svg id="square" viewBox="0 0 100 100" width="100%" height="100%">
          <rect fill="white" stroke="black" stroke-width="1" stroke-linejoin="round"
            x="0"
            y="0"
            width="100%"
            height="100%"
          />
        </svg>

          <cube-></cube->
          <cube-></cube->
          <cube-></cube->
          <cube-></cube->

          <cube-></cube->
          <cube-></cube->
          <cube-></cube->
          <cube-></cube->

          <cube-></cube->
          <cube-></cube->
          <cube-></cube->
          <cube-></cube->

          <cube-></cube->
          <cube-></cube->
          <cube-></cube->
          <cube-></cube->

        <svg id="cube-thing" viewBox="0 0 500 500" width="500%" height="500%">
          <path d="M 400 0 L 500 100 L 100 500 L 0 500 L 0 400 L 400 0" fill="white" />
          <path d="M 400.4 0 L 0 400 M 0 500 L 400.4 99.6 M 500 99.6 L 100 500" stroke="black" stroke-width="0.5" stroke-linecap="butt" />
        </svg>
      </div>
    `;
  }

}

customElements.define('boggle-board', BoggleBoard);
