import {
  css,
  html,
  LitElement,
} from 'lit-element';
import {
  classMap
} from 'lit-html/directives/class-map.js';
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
      label: {
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
    this._primaryColor = window.getComputedStyle(document.documentElement)
      .getPropertyValue('--mdc-theme-primary')
      .trim()
      .replace('#', '');
    console.log('this._primaryColor', this._primaryColor);
    this._iconSvg =
      "data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='5' viewBox='7 10 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23" +
      this._primaryColor + "' fill-rule='evenodd' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E";
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
      'mdc-select--outlined': this.outlined,
      // 'mdc-checkbox--disabled': this.disabled,
      // 'mdc-card--raised': this.raised,
      // 'mdc-button--unelevated': this.unelevated,
      // 'mdc-button--dense': this.dense,
    };
    return html `
      <style>

        slot {
          display: none;
        }

        :host {
          display: inline-block;
        }

        .mdc-select {
          width: 100%;
        }

        label {
          max-width: calc(100% - 48px);
        }

        .mdc-select:not(.mdc-select--disabled).mdc-select--focused .mdc-floating-label {
          color: var(--mdc-theme-primary) !important;
        }

        .mdc-select--focused .mdc-select__dropdown-icon {
          background: url("${this._iconSvg}") no-repeat center !important;
        }




        

      </style>
      <div class="mdc-select ${classMap(classes)}">
        <i class="mdc-select__dropdown-icon"></i>
        <select class="mdc-select__native-control">
          ${this.renderFirstOption()}
          ${this.renderOptionList()}
        </select>
        ${this.renderLabel()}
        ${this.renderRippleOrOutline()}
      </div>
      <slot></slot>
    `;
  }

  renderRippleOrOutline() {
    if (this.outlined) {
      return html `
        <div class="mdc-notched-outline">
          <div class="mdc-notched-outline__leading"></div>
          <div class="mdc-notched-outline__notch">
            <label class="mdc-floating-label">Pick a Food Group</label>
          </div>
          <div class="mdc-notched-outline__trailing"></div>
        </div>
      `;
    } else {
      return html `
        <div class="mdc-line-ripple"></div>
      `;
    }
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

  renderLabel() {
    if (this.label) {
      return html `<label class="mdc-floating-label">${this.label}</label>`;
    } else {
      return html ``;
    }
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


  disconnectedCallback() {
    // TODO: remove listener?
    super.disconnectedCallback();
  }



}

export {
  Select,
};

window.customElements.define('mdwc-select', Select);
