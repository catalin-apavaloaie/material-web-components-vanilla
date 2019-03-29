import {
  css,
  html,
  LitElement,
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map.js';
import {
  MDCTextField,
} from '@material/textfield/index.js';
import {
  materialCss
} from './material.css.js';


class Textfield extends LitElement {

  static get properties() {
    return {
    }
  }

  constructor() {
    super();
  }

  firstUpdated() {

  }

  updated(changes) {
  }

  static get styles() {
    return [
      materialCss,
      css `
      `,
    ];
  }

  render() {
    return html `
      Textfield
    `;
  }
}

export {
  Textfield,
};

window.customElements.define('mdwc-textfield', Textfield);
