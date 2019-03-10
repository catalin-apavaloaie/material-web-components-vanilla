import {
  html,
  LitElement,
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map.js';
import {
  MDCRipple
} from '@material/ripple/index.js';
import {
  materialCss
} from './material.css.js';

class Button extends LitElement {

  static get properties() {
    return {
      raised: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },
      ripple: {
        type: Boolean,
      },
      href: {

      },
    }
  }

  static get styles() {
    return [
      elementCss,
    ];
  }

  render() {
    const classes = {
      'mdc-button--raised': this.raised,
    }
    return html `
      <button id="container" class="mdc-button ${classMap(classes)}" .disabled="${this.disabled}">
        ${this.renderLabel()}
      </button>
    `;
  }

  renderLabel() {
    if (this.href) {
      return html `<a href="${this.href}"><slot></slot></a>`;
    } else {
      return html `<span class="mdc-button__label"><slot></slot></span>`;
    }
  }

  firstUpdated() {
    if (this.ripple) {
      this._mdcRipple = new MDCRipple(this.shadowRoot.getElementById('container'));
    }
  }

}

export {
  Button,
};

window.customElements.define('mdwc-button', Button);
