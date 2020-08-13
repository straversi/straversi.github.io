import {
  LitElement,
  html,
  css,
  property,
  query,
  customElement,
} from 'lit-element';
import {classMap} from 'lit-html/directives/class-map';

const FACES = ['left', 'right', 'top', 'bottom', 'front', 'back'] as const;
type face = typeof FACES[number];

@customElement('cube-')
export class Cube extends LitElement {
  @property() face: string = 'top';
  @property() char: string = '?';
  @property({type: Boolean, reflect: true}) fauxcused: boolean = false;

  @query('input') input!: HTMLInputElement;

  text = {
    left: 'A',
    right: 'B',
    top: '?',
    bottom: 'D',
    front: 'E',
    back: 'F',
  };

  constructor() {
    super();
    this.tabIndex = 0;
    this.addEventListener('keydown', (e) => this.enteredChar(e.key));
    this.addEventListener('click', () => {
      console.log('clicked');
      // Keeps the focus on the input if a cube is clicked more than
      // once in a row.
      this.input.focus();
    });
    this.addEventListener('focus', () => {
      console.log('focused');
      // Immediately change focus to an input element to get the keyboard
      // to appear on mobile.
      this.fauxcused = true;
      this.input.focus();
    });
    this.addEventListener('blur', () => {
      console.log('blurred');
      this.fauxcused = false;
    });
  }

  static styles = css`
    :host {
      display: inline-block;
      position: relative;
      --border-color: black;
      --border-width: 0px;
      --z-multiplier: -0.5;
    }

    :host(:hover) {
      cursor: pointer;
    }

    :host(:focus) {
      outline: none;
    }
    .fauxcused path {
      stroke: #42a5f5;
      stroke-width: 12;
    }
    input {
      font-size: 16px;
      position: absolute;
      transform: scale(0);
    }

    #scene {
      width: 100%;
      height: 100%;
      perspective: 1000px;
    }

    .cube {
      width: 100%;
      height: 100%;
      position: relative;
      transform-style: preserve-3d;
      transform: translateZ(calc(-0.5 * 80px));
      transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .cube__face {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 1);
      /* border: var(--border-width, 0px) solid var(--border-color, red); */
      box-sizing: border-box;
      text-align: center;
    }

    .cube__face > div {
      font-size: var(--cube-font-size, 190px);
      font-family: 'Righteous', sans-serif;
      font-weight: 800;
      color: #9e9e9e;
      display: inline-block;
      line-height: var(--cube-line-height, 82px);
      text-transform: uppercase;
    }
    .cube.with-char > .cube__face > div {
      color: #ff7262;
    }
    .cube__face > div.qu {
      font-size: calc(var(--cube-font-size, 190px) / 1.7);
    }

    .cube__face > svg {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }

    .cube__face--front {
      transform: rotateY(0deg);
    }
    .cube__face--right {
      transform: rotateY(90deg);
    }
    .cube__face--back {
      transform: rotateY(180deg);
    }
    .cube__face--left {
      transform: rotateY(-90deg);
    }
    .cube__face--top {
      transform: rotateX(90deg);
    }
    .cube__face--bottom {
      transform: rotateX(-90deg);
    }
    .cube__face--front {
      transform: rotateY(0deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--right {
      transform: rotateY(90deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--back {
      transform: rotateY(180deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--left {
      transform: rotateY(-90deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--top {
      transform: rotateX(90deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }
    .cube__face--bottom {
      transform: rotateX(-90deg) translateZ(calc(0.5 * var(--cube-width, 80px)));
    }

    .cube.front {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateY(0deg);
    }
    .cube.right {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateY(-90deg);
    }
    .cube.back {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateY(-180deg);
    }
    .cube.left {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateY(90deg);
    }
    .cube.top {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateX(-90deg);
    }
    .cube.bottom {
      transform: translateZ(calc(var(--z-multiplier) * var(--cube-width, 80px)))
        rotateX(90deg);
    }
  `;

  enteredChar(char: string) {
    console.log('entered ', char);
    char = char.toUpperCase();
    if (!char.match(/^([A-Z]|QU)$/)) {
      return;
    } /* just don't use e.key */
    if (this.char !== char) {
      this.char = char;
      let nextFace = this._nextFace();
      this.text[nextFace] = this.char;
      this.face = nextFace;
    }
    this.dispatchEvent(
      new CustomEvent('boggleCharacterEntered', {
        bubbles: true,
        composed: true,
      })
    );
  }

  _charWasEntered() {
    return this.char !== '?';
  }

  _nextFace(): face {
    let chosenFace: face;
    do {
      chosenFace = FACES[Math.floor(Math.random() * FACES.length)];
    } while (chosenFace == this.face);
    return chosenFace;
  }

  _face() {
    return html`<svg viewBox="0 0 100 100">
      <path
        d="M0,0 L100,0 100,100 0,100 0,0"
        fill="none"
        stroke="black"
        stroke-width="8"
      />
    </svg>`;
  }

  _addQuClass(text: string) {
    return classMap({qu: text === 'QU'});
  }

  render() {
    return html`
      <input type="text" />
      <div id="scene" class="${classMap({fauxcused: !!this.fauxcused})}">
        <div
          class="cube ${this.face} ${this._charWasEntered() ? 'with-char' : ''}"
        >
          <div class="cube__face cube__face--front">
            ${this._face()}
            <div class=${this._addQuClass(this.text.front)}>
              ${this.text.front}
            </div>
          </div>
          <div class="cube__face cube__face--back">
            ${this._face()}
            <div class=${this._addQuClass(this.text.back)}>
              ${this.text.back}
            </div>
          </div>
          <div class="cube__face cube__face--right">
            ${this._face()}
            <div class=${this._addQuClass(this.text.right)}>
              ${this.text.right}
            </div>
          </div>
          <div class="cube__face cube__face--left">
            ${this._face()}
            <div class=${this._addQuClass(this.text.left)}>
              ${this.text.left}
            </div>
          </div>
          <div class="cube__face cube__face--top">
            ${this._face()}
            <div class=${this._addQuClass(this.text.top)}>${this.text.top}</div>
          </div>
          <div class="cube__face cube__face--bottom">
            ${this._face()}
            <div class=${this._addQuClass(this.text.bottom)}>
              ${this.text.bottom}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}
