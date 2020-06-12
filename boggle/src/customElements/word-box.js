import {LitElement, html, css} from 'lit-element';

export class WordBox extends LitElement {

  static get properties() {
    return {
      words: {type: Array},
    }
  }

  constructor() {
    super();
    this.words = [
      {word: 'hello', points: 2},
      {word: 'hello', points: 2},
      {word: 'hello', points: 2},
    ];
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }
      ul {
        font-family: 'Righteous';
        font-size: 36px;
        list-style: none;
        padding: 0px 0px 0px 18px;
        margin: 0;
        height: 100%;
        overflow: scroll;
        position: relative;
        z-index: 3;
        border: 2px solid black;
        /* box-shadow: inset 0px 0px 0px 1px black; */
      }
      li {
        padding-right: 28px;
        display: flex;
        align-items: center;
      }
      li span.word {
        flex: 1;
        text-align: left;
      }
      li span.points {
        font-size: 28px;
        color: #A259FF;
      }
      #words-container {
        padding: 0px;
        position: relative;
        width: 100%;
        height: 100%;
        background: white;
        box-sizing: border-box;
      }
      #bottom-quad {
        width: 500%;
        right: 0px; top: 100%;
        position: absolute;
      }
      #left-quad {
        height: 500%;
        right: calc(100% - 2px); top: 0px;
        position: absolute;
      }
      #line-1, #line-2, #line-3 {
        position: absolute;
        z-index: 2;
        width: 500px;
      }
      #line-1 { right: calc(100% - 1px); top: 0; }
      #line-2 { right: calc(100% - 2px); top: calc(100% - 1px); }
      #line-3 { right: 0; top: calc(100% - 1px); }
    `;
  }

  render() {
    return html`
      <div id="words-container">
        <ul>
          ${this.words.map(w => html`<li><span class="word">${w.word}</span><span class="points">+${w.points}</span></li>`)}
        </ul>
        <svg
          id="bottom-quad"
          viewBox="0 0 100 100">
          <!-- overhang slightly to left so left-quad controls the shared border -->
          <path
            d="M 77 0 l -100 100
               l 23 0 l 100 -100"
            stroke-width="0"
            fill="white"
          ></path>
        </svg>
        <svg
          id="left-quad"
          viewBox="0 0 100 100">
          <path
            d="M 100 0 l -100 100
               l 0 20 l 100 -100"
            stroke-width="0"
            fill="white"
          ></path>
        </svg>
        <svg id="line-1" viewBox="0 0 100 100">
          <path d="M 100 0 L 0 100" fill="none" stroke="black" stroke-width="0.4" stroke-linejoin="round"/>
        </svg>
        <svg id="line-2" viewBox="0 0 100 100">
          <path d="M 100 0 L 0 100" fill="none" stroke="black" stroke-width="0.4" stroke-linejoin="round"/>
        </svg>
        <svg id="line-3" viewBox="0 0 100 100">
          <path d="M 100 0 L 0 100" fill="none" stroke="black" stroke-width="0.4" stroke-linejoin="round"/>
        </svg>
      </div>
    `;
  }

}

customElements.define('word-box', WordBox);
