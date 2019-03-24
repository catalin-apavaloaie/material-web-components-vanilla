import {
  css,
  html,
  LitElement,
} from 'lit-element';
// import {
//   classMap
// } from 'lit-html/directives/class-map.js';
import {
  MDCSelect,
} from '@material/select/index.js';
import {
  materialCss
} from './material.css.js';

/*
TODO:
1. consider passing options as argument to the element
*/

class Select extends LitElement {

  static get properties() {
    return {
      value: {
        type: String,
      },
      _options: {
        type: Array,
      },

      // TODO: implement
      outlined: {
        type: Boolean,
      },
      disabled: {
        type: Boolean,
      },

    }
  }

  constructor() {
    super();
    this._options = [];
  }

  static get styles() {
    return [
      materialCss,
      css `
        slot {
          display: none;
        }
      `,
    ];
  }

  render() {
    const classes = {
      'mdc-select--outlined': this.outlined,
      // 'mdc-checkbox--disabled': this.disabled,
      // 'mdc-card--raised': this.raised,
      // 'mdc-button--unelevated': this.unelevated,
      // 'mdc-button--dense': this.dense,
    };
    return html `
      <div class="mdc-select">
        <i class="mdc-select__dropdown-icon"></i>
        <select class="mdc-select__native-control">
          ${this.renderFirstOption()}
          ${this.renderOptionList()}
        </select>
        <label class="mdc-floating-label">Pick a Food Group</label>
        <div class="mdc-line-ripple"></div>
      </div>
      <slot></slot>
    `;
  }

  renderFirstOption() {
    return html `<option value="" .disabled="${this.disabled}" selected></option>`;
  }

  renderOptionList() {
    return html `${this._options.map(option => this.renderOption(option))}`;
  }

  renderOption(option) {
    return html `
      <option value="${option.value}">
        ${option.label}
      </option>
    `;
  }

  // constructor() {
  //   super();
  // let slots = this.shadowRoot.querySelectorAll('slot');
  // console.log(slots);
  // ?
  // }

  firstUpdated() {
    let select = new MDCSelect(this.shadowRoot.querySelector('.mdc-select'));
    this._mdcSelect = select;
    select.listen('MDCSelect:change', () => {
      this.value = select.value;
      // TODO: dispatch value/change event?
    });

    let slot = this.shadowRoot.querySelector('slot');
    slot.addEventListener('slotchange', (e) => {
      this._options = slot.assignedElements()
        .map((element) => {
          return {
            value: element.value,
            label: element.innerHTML,
          };
        });
    });
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {
  //   // TODO: remove listener?
  //   super.disconnectedCallback();
  // }


}

export {
  Select,
};

window.customElements.define('mdwc-select', Select);
