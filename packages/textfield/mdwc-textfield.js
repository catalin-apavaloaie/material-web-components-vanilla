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
      label: {
        type: String,
      },
      value: {
        type: String,
      },
      disabled: {
        type: Boolean,
      },
      outlined: {
        type: Boolean,
      },
    }
  }

  constructor() {
    super();
  }

  firstUpdated() {
    const textField = new MDCTextField(this.shadowRoot.querySelector('.mdc-text-field'));
    this._mdcTextField = textField;
  
    textField.listen('MDCTextField:change', (e) => {
      this.value = e.detail.value;

      console.log('MDCTextField', e)
    });

    this.shadowRoot.querySelector('.mdc-text-field').addEventListener('change', () => {
      console.log('changeeee');
    });
  }

  static get styles() {
    return [
      materialCss,
      css `
      `,
    ];
  }

  render() {
    const classes = {
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--disabled': this.disabled,
    };
    return html `
      <style>
        .mdc-text-field {
          width: 100%;
        }
      </style>
      <div class="mdc-text-field ${classMap(classes)}">
        <input type="text" id="my-text-field" class="mdc-text-field__input" value="${this.value}" @input="${this.valueChanged}">
        <label class="mdc-floating-label" for="my-text-field">${this.label}</label>
        <div class="mdc-line-ripple"></div>
      </div>
    `;
  }

  valueChanged(e) {
    this.dispatchEvent(new CustomEvent('changed', {
      detail: this.shadowRoot.querySelector('#my-text-field').value,
    }));
  }
}

export {
  Textfield,
};

window.customElements.define('mdwc-textfield', Textfield);
