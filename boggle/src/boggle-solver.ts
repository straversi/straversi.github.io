import './customElements/cube';
import './customElements/boggle-board';
import './customElements/q-or-qu';
import './customElements/solve-button';
import './customElements/word-box';
import {WordBox} from './customElements/word-box';
import {BoggleBoard, board} from './customElements/boggle-board';
import {SolveButton} from './customElements/solve-button';
import {Cube} from './customElements/cube';
import {QOrQu} from './customElements/q-or-qu';
import {
  LitElement,
  html,
  css,
  query,
  customElement,
  property,
} from 'lit-element';

type solvedBoard = [string, number][];
// These state strings align with class names. Keep them in sync.
type solvedState = 'unsolved' | 'solving' | 'solved';

@customElement('boggle-solver')
export class BoggleSolver extends LitElement {
  @query('boggle-board') boggleBoard!: BoggleBoard;
  @query('word-box') wordBox!: WordBox;
  @query('solve-button') solveButton!: SolveButton;

  @property() state: solvedState = 'unsolved';

  qu?: boolean = undefined;

  constructor() {
    super();
    this.addEventListener('keydown', this.handleKeydown, {capture: true});
  }

  async handleKeydown(e: KeyboardEvent) {
    const key = e.key.toUpperCase();
    if (key === 'Q') {
      e.stopPropagation();
      const cubeTarget = e
        .composedPath()
        .find(
          (eventTarget) => (eventTarget as HTMLElement).tagName === 'CUBE-'
        ) as Cube;
      if (this.qu === undefined) {
        this.qu = await QOrQu.mount().useQu();
      }
      const char = this.qu ? 'QU' : 'Q';
      cubeTarget.enteredChar(char);
    }
  }

  async solve(board: board): Promise<solvedBoard> {
    console.log('sending board:', board);
    const solveEndpoint = 'https://api.steven.codes/boggle/solve';
    // const solveEndpoint = 'http://localhost:5000/boggle/solve';

    const body = {board: board};
    const request = new Request(solveEndpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      // Important: must stringify entire body, or else JSON will
      // be unreadable by Flask
      body: JSON.stringify(body),
    });
    const result = await fetch(request);
    return await result.json();
  }

  displayWords(words: solvedBoard) {
    this.wordBox.words = words.map((w) => ({word: w[0], points: w[1]}));
  }

  async solveButtonClicked() {
    this.state = 'solving';
    // const [results] = await Promise.all([
    //   solve(board.board()),
    //   timeout(800), // amount of time SOLVE-BUTTON takes to hide itself.
    // ]);
    const results = await this.solve(this.boggleBoard.board());
    this.displayWords(results);
    this.state = 'solved';
    console.log('solved.');
  }

  render() {
    return html`<div id="container">
      <boggle-board></boggle-board>
      <div id="results">
        <solve-button
          class="${this.state}"
          @click=${() => this.solveButtonClicked()}
        ></solve-button>
        <word-box class="${this.state}"></word-box>
      </div>
    </div>`;
  }

  static styles = css`
    :host {
      --word-box-width: 293px;
      --word-box-height: 380px;
      margin: 0;
    }

    #container {
      overflow-y: hidden; /* hides the overflowing svgs in the components */
      min-height: 100vh; /*                    ...                       */
      /* 😫 can't flex wrap because need to change the z-index when wrapped */
      --container-padding: 12px;
      padding: var(--container-padding);
    }

    boggle-board {
      position: relative;
      z-index: 3;
      line-height: normal; /* reset */
      margin: 0 auto;

      --board-width: 400px;
      width: var(--board-width);
      height: var(--board-width);
      max-width: calc(100vmin - 2 * var(--container-padding));
      max-height: calc(100vmin - 2 * var(--container-padding));
    }

    #results {
      position: relative;
    }

    word-box {
      transform: translate(-500px, 500px);
      position: relative;
      width: 100%;
      max-width: 575px;
      margin: 0 auto;
      height: 200px;
      top: calc(-1 * (84px + 40px)); /* height of solve button + its margin */
      z-index: 4;
      line-height: normal; /* reset */
    }

    solve-button {
      position: relative;
      margin: 40px auto;
      z-index: 4;
      /* transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); */
    }

    /* Mobile */
    @media (max-width: 760px) {
    }

    /* Solved states */

    word-box.solved {
      animation-name: run-away;
      animation-duration: 0.8s;
      animation-iteration-count: 1;
      animation-direction: reverse;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transform: translate(0px, 0px);
      /* vertical-align: middle; */
    }

    solve-button.solving,
    solve-button.solved {
      animation-name: run-away;
      animation-duration: 0.8s;
      animation-iteration-count: 1;
      animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transform: translate(-500px, 500px);
    }

    @keyframes run-away {
      0% {
        transform: translate(0px, 0px);
      }
      20% {
        transform: translate(20px, -20px);
      }
      100% {
        transform: translate(-500px, 500px);
      }
    }
  `;
}

// function timeout(ms: number) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }
