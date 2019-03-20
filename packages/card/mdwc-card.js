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

class Card extends LitElement {

  static get properties() {
    return {
      outlined: {
        type: Boolean,
      }
    }
  }

  static get styles() {
    return [
      materialCss,
      css `
        :host {
          display: block;
        }
      `,
    ];
  }

  render() {
    const classes = {
      'mdc-card--raised': this.raised,
      // 'mdc-button--unelevated': this.unelevated,
      // 'mdc-button--outlined': this.outlined,
      // 'mdc-button--dense': this.dense,
    };
    return html `
      <div class="mdc-card ${classMap(classes)}">
        <slot></slot>
      </div>
    `;
  }

}

export {
  Card,
};

window.customElements.define('mdwc-card', Card);
