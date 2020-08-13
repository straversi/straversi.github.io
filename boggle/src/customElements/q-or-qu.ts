import {LitElement, html, css, customElement} from 'lit-element';

@customElement('q-or-qu')
export class QOrQu extends LitElement {
  static mount(parent: ParentNode = document.body): QOrQu {
    const qOrQu = document.createElement('q-or-qu') as QOrQu;
    parent.prepend(qOrQu);
    return qOrQu;
  }

  async useQu(): Promise<boolean> {
    return new Promise((resolve) => {
      this.addEventListener('qu-decision', (e) => {
        this.parentNode!.removeChild(this);
        resolve((e as CustomEvent).detail.useQu);
      });
    });
  }

  quDecided(qu: boolean) {
    this.dispatchEvent(new CustomEvent('qu-decision', {detail: {useQu: qu}}));
  }

  render() {
    return html`
      <div id="dialog">
        <div id="buttons">
          <button id="q" @click=${() => this.quDecided(false)}>Q</button>
          <span id="or">or</span>
          <button id="qu" @click=${() => this.quDecided(true)}>Qu</button>
          <span id="question">?</span>
        </div>
        <div id="form">
          <input checked type="checkbox" id="remember" /><label for="remember"
            >Remember for future boards</label
          >
        </div>
      </div>
    `;
  }

  static styles = css`
    :host {
      background: rgba(0, 0, 0, 0.8);
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
    #dialog {
      display: block;
      border: 3px solid black;
      background: white;
      padding-top: 26px;
      padding-bottom: 12px;
      --button-size: 100px;
      position: absolute;
      width: 349px;
      max-width: calc(100% - 10px);
      box-sizing: border-box;
      top: 81px;
      left: 50%;
      transform: translate(-50%);
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
}
