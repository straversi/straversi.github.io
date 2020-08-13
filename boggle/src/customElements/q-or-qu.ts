import {LitElement, html, css, customElement} from 'lit-element';

@customElement('q-or-qu')
export class QOrQu extends LitElement {
  static styles = css`
    :host {
      display: block;
      border: 3px solid black;
      background: white;
      padding-top: 26px;
      padding-bottom: 12px;
      --button-size: 100px;
    }
    #buttons {
      display: flex;
      align-items: center;
      justify-content: center;
    }
    #or {
      font-family: sans-serif;
      font-weight: 700;
      font-size: 30px;
      padding-left: 10px;
      padding-right: 14px;
    }
    button {
      position: relative;
      font-family: 'Righteous';
      font-size: 70px;
      width: var(--button-size);
      height: var(--button-size);
      padding: 0;
      background: #e8f8ff;
      border: 6px solid #1abcfe;
      border-radius: 10px;
      box-shadow: -4px 4px 0px 0px #0e80ae;
      cursor: pointer;
    }
    button:hover {
      box-shadow: -3px 3px 0px 0px #0e80ae;
      left: -1px;
      top: 1px;
    }
    button:active {
      box-shadow: none;
      left: -4px;
      top: 4px;
    }
    #q {
      margin-left: 16px;
    }
    #qu {
      width: calc(var(--button-size) + 20px);
    }
    #question {
      font-family: 'Righteous';
      font-size: 34px;
      padding-left: 10px;
    }
    input {
      transform: scale(1.4) translateY(-1px);
      margin-right: 10px;
    }
    #form {
      font-family: sans-serif;
      left: -10px;
      position: relative;
      margin-top: 30px;
      text-align: center;
    }
  `;

  qClicked() {
    this.dispatchEvent(
      new CustomEvent('qu-decision', {detail: {useQu: false}})
    );
  }

  quClicked() {
    this.dispatchEvent(new CustomEvent('qu-decision', {detail: {useQu: true}}));
  }

  render() {
    return html`
      <div id="buttons">
        <button id="q" @click=${this.qClicked}>Q</button>
        <span id="or">or</span>
        <button id="qu" @click=${this.quClicked}>Qu</button>
        <span id="question">?</span>
      </div>
      <div id="form">
        <input checked type="checkbox" id="remember" /><label for="remember"
          >Remember for future boards</label
        >
      </div>
    `;
  }
}
