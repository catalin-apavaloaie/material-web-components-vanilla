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


class Select extends LitElement {

  static get properties() {
    return {
      value: {
        type: String,
      },
      label: {
        type: String,
      },
      options: {
        type: Array,
      },
      outlined: {
        type: Boolean,
      },
      keyForLabel: {
        type: String,
      },
      keyForValue: {
        type: String,
      },
      disabled: {
        type: Boolean,
      },
    }
  }

  constructor() {
    super();
    this._buildIconSvg();
    this._addObserverForLayoutRetrigger();
    if (!this.keyForValue) {
      this.keyForValue = 'value';
    }
    if (!this.keyForLabel) {
      this.keyForLabel = 'label';
    }
  }

  firstUpdated() {
    let select = new MDCSelect(this.shadowRoot.querySelector('.mdc-select'));
    this._mdcSelect = select;
    select.listen('MDCSelect:change', (e) => {
      this.value = e.detail.value;
    });
  }

  updated(changes) {
    if (changes.has('value')) {

      let selected = this.options.find(item => item[this.keyForValue] == this.value);
      this.dispatchEvent(new CustomEvent('value-updated', {
        detail: {
          value: selected ? this.value : undefined,
          data: selected,
        }
      }));

      if (!selected) {
        this.value = '';
        this._mdcSelect.value = this.value;
      }
    }

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
      'mdc-select--disabled': this.disabled,
      'mdc-select--no-label': !this.label,
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
        <select class="mdc-select__native-control" .value="${this.value}" ?disabled="${this.disabled}">
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
            ${this.label ? html `
            <label class="mdc-floating-label">${this.label}</label>
            ` : ''}
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
    return html `<option value="" .disabled="${this.disabled}" ?selected="${undefined == this.value}"></option>`;
  }

  renderOptionList() {
    if (!this.options) return;
    return html `${this.options.map(option => this.renderOption(option))}`;
  }

  renderOption(option) {
    return html `
      <option value="${option[this.keyForValue]}" ?selected="${this.value == option[this.keyForValue]}">
        ${option[this.keyForLabel]}
      </option>
    `;
  }

  renderLabel() {
    if (this.label && !this.outlined) {
      return html `<label class="mdc-floating-label">${this.label}</label>`;
    } else {
      return html ``;
    }
  }

  _buildIconSvg() {
    // TODO: we do this to be able for the element to respect the MDC theme variables
    this._primaryColor = window.getComputedStyle(document.documentElement)
      .getPropertyValue('--mdc-theme-primary')
      .trim()
      .replace('#', '');
    this._iconSvg =
      "data:image/svg+xml;charset=utf-8,%3Csvg width='10' height='5' viewBox='7 10 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill='%23" +
      this._primaryColor + "' fill-rule='evenodd' d='M7 10l5 5 5-5z'/%3E%3C/svg%3E";
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
    this._mdcSelect.layout();
  }

}

export {
  Select,
};

window.customElements.define('mdwc-select', Select);
