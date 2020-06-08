import {LitElement, html} from 'lit-element';

export class SolveButton extends LitElement {

  static get properties() {
    return {

    }
  }

  style() {
    return html`<style>
      :host {
        display: block;
        width: 246px; height: 84px;
      }
      #solve-button {
        color: white;
        font-family: 'Righteous', sans-serif;
        font-size: 40px;
        position: relative;
        line-height: 84px;
        text-transform: uppercase;
        z-index: 1;
        cursor: pointer;
      }
      #left-items {
        position: absolute;
        top: 0; left: 24px; right: 0; bottom: 0;
        text-align: left;
        z-index: 1;
      }
      #right-items {
        position: absolute;
        top: 0; left: 0; right: 24px; bottom: 0;
        text-align: right;
        z-index: 1;
      }
      .arrow {
        display: inline-block;
        width: 36px;
        height: 36px;
        vertical-align: -3px;
      }

      .square {
        position: absolute;
        top: -16px; right: -16px;
        width: calc(418px * 4);
      }
    </style>`
  }

  render() {
    return html`${this.style()}
      <div id="solve-button">
        <div id="left-items">
          <span>solve</span>
        </div>
        <div id="right-items">
          <svg class="arrow" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" fill="#fff"/></svg>
        </div>
        <svg class="square" viewBox="-1 -1 102 102">
          <path d="M85,0 L0,85 0,90 15,90 100,5 M85,5 L0,90" fill="#fff" stroke="black" stroke-width="0.1" stroke-linejoin="round"/>
          <path d="M85,0 L100,0 100,5 85,5 85,0" fill="#FF7262" stroke="black" stroke-width="0.1" stroke-linejoin="round"/>
        </svg>
      </div>
    `;
  }

}

customElements.define('solve-button', SolveButton);
