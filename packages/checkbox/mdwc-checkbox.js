import {
  // css,
  html,
  LitElement,
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map.js';
import {
  MDCCheckbox
} from '@material/checkbox/index.js';
import {
  materialCss
} from './material.css.js';

class Checkbox extends LitElement {

  static get properties() {
    return {
      disabled: {
        type: Boolean,
      },
      checked: {
        type: Boolean,
      },
      value: {
        type: String,
      },
    }
  }

  static get styles() {
    return [
      materialCss,
      // css `
      //   :host {
      //     display: block;
      //   }
      // `,
    ];
  }

  constructor() {
    super();
    this.value = 'on';
  }

  render() {
    const classes = {
      'mdc-checkbox--disabled': this.disabled,
      // 'mdc-card--raised': this.raised,
      // 'mdc-button--unelevated': this.unelevated,
      // 'mdc-button--outlined': this.outlined,
      // 'mdc-button--dense': this.dense,
    };
    return html `
      <div class="mdc-checkbox ${classMap(classes)}">
        <input type="checkbox"
              class="mdc-checkbox__native-control"
              id="checkbox-1"
              />
        <div class="mdc-checkbox__background">
          <svg class="mdc-checkbox__checkmark"
              viewBox="0 0 24 24">
            <path class="mdc-checkbox__checkmark-path"
                  fill="none"
                  d="M1.73,12.91 8.1,19.28 22.79,4.59"/>
          </svg>
          <div class="mdc-checkbox__mixedmark"></div>
        </div>
      </div>
    `;
  }

  firstUpdated() {
    let checkbox = this.shadowRoot.querySelector('.mdc-checkbox');
    this._mdcCheckbox = new MDCCheckbox(checkbox);
    this._mdcCheckbox.disabled = this.disabled;
    checkbox.addEventListener('input', this._handleInputEvent.bind(this));
  }

  _handleInputEvent(e) {
    this.checked = e.target.checked;
  }

  updated(changes) {
    if (changes.has('checked')) {
      this._mdcCheckbox.checked = this.checked;
      this.dispatchEvent(new CustomEvent('value-changed', {
        detail: {
          checked: this.checked,
          value: this.value,
        }
      }));
    }
  }

}

export {
  Checkbox,
};

window.customElements.define('mdwc-checkbox', Checkbox);
