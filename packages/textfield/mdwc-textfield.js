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
      type: {
        type: String,
      },
      required: {
        type: Boolean,
      },
      helperText: {
        type: String,
      },
      validationMessage: {
        type: String,
      },
      pattern: {
        type: String,
      },
      validity: {
        type: Object,
      },
    }
  }

  constructor() {
    super();

    this._addObserverForLayoutRetrigger();
    if (!this.type) {
      this.type = 'text';
    }
  }

  _addObserverForLayoutRetrigger() {
    // https://github.com/material-components/material-components-web/issues/4328
    let callback = () => {
      this._updateLayout();
    }
    let observer = new IntersectionObserver(callback, {});
    observer.observe(this);
  }

  _updateLayout() {
    this._mdcTextField.layout();
  }

  firstUpdated() {
    const textField = new MDCTextField(this.shadowRoot.querySelector('.mdc-text-field'));
    this._mdcTextField = textField;
  }

  updated(changes) {
    if (changes.has('disabled')) {
      this._mdcTextField.disabled = this.disabled;
    }

    if (changes.has('value')) {
      this._mdcTextField.value = this.value;

      this.dispatchEvent(new CustomEvent('value-updated', {
        detail: {
          value: this.value,
        }
      }));
    }
  }

  static get styles() {
    return [
      materialCss,
      css `
      .mdc-text-field {
        width: 100%;
      }
      `,
    ];
  }

  render() {
    const classes = {
      'mdc-text-field--outlined': this.outlined,
      'mdc-text-field--disabled': this.disabled,
      'mdc-text-field--textarea': this.type == 'textarea',
      'mdc-text-field--no-label': !this.label,
    };

    return html `
      <div class="mdc-text-field ${classMap(classes)}">
        ${this.renderInputOrTextarea()}
        ${this.renderOutlineOrRipple()}
      </div>

      ${this.helperText || this.validationMessage? html `
      <div class="mdc-text-field-helper-line">
        <p class="mdc-text-field-helper-text mdc-text-field-helper-text--persistent mdc-text-field-helper-text--validation-msg">
          ${this.validationMessage ? this.validationMessage : this.helperText}
        </p>
      </div>
      ` : ''}
    `;
  }

  renderOutlineOrRipple() {
    if (this.outlined) {
      return html `
        <div class="mdc-notched-outline ${!this.label ? 'mdc-notched-outlined--no-label' : ''}">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            ${this.label ? html`
            <label for="mdwc-text-field" class="mdc-floating-label">${this.label}</label>
            ` : ''}
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      `;
    }
    return html `
      <label class="mdc-floating-label" for="mdwc-text-field">${this.label}</label>
      <div class="mdc-line-ripple"></div>
    `;
  }

  renderInputOrTextarea() {
    if (this.type == 'textarea') {
      return html `
        <textarea 
          id="mdwc-text-field" 
          class="mdc-text-field__input" 
          rows="8" 
          cols="40" 
          @input="${this.valueChanged}"
          @blur="${this._setValidation}"
          ?required="${this.required}"
          ?disabled="${this.disabled}">${this.value}</textarea>
      `;
    }

    return html `
      <input 
        type="${this.type}" 
        id="mdwc-text-field" 
        class="mdc-text-field__input" 
        value="${this.value == null ? "" : this.value}" 
        @input="${this.valueChanged}"
        @blur="${this._setValidation}"
        ?required="${this.required}"
        .pattern="${this.pattern ? this.pattern : '.*'}"
        ?disabled="${this.disabled}">
    `;
  }

  valueChanged(event) {
    this.value = event.currentTarget.value;
    this._setValidation();
  }

  _setValidation() {
    let field = this.shadowRoot.getElementById('mdwc-text-field');
    this.validity = field.validity;
    this.validationMessage = field.validationMessage;
  }

  setCustomValidity(message) {
    this.validationMessage = message;
  }

}

export {
  Textfield,
};

window.customElements.define('mdwc-textfield', Textfield);
