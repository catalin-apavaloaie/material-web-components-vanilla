import {
  css,
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

class Fab extends LitElement {

  static get properties() {
    return {
      label: {
        type: String,
      },
      icon: {
        type: String,
      },
      extended: {
        type: Boolean,
      },
      mini: {
        type: Boolean,
      },
      exited: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },
    }
  }

  static get styles() {
    return [
      materialCss,
      css `
        :host {
          display: inline-flex;
          
        }
        
      `,
    ];
  }

  render() {
    const classes = {
      'mdc-fab--extended': this.extended,
      'mdc-fab--mini': this.mini,
      'mdc-fab--exited': this.exited,
    };
    return html `
      <button class="mdc-fab ${classMap(classes)}" .disabled="${this.disabled}">
        ${this.renderIcon()}
        ${this.renderLabel()}
      </button>
    `;
  }

  renderLabel() {
    if (this.label) {
      return html `<span class="mdc-fab__label"><slot></slot></span>`;
    }
  }

  renderIcon() {
    if (this.icon) {
      return html `<span class="mdc-fab__icon material-icons"><slot></slot></span>`;
    }
  }

  firstUpdated() {
    if (this.ripple) {
      this._mdcRipple = new MDCRipple(this.shadowRoot.querySelector('.mdc-fab'));
    }
  }

}

export {
  Fab,
};

window.customElements.define('mdwc-fab', Fab);