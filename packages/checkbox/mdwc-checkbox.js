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
    this._mdcCheckbox = new MDCCheckbox(this.shadowRoot.querySelector('.mdc-checkbox'));
    this._mdcCheckbox.disabled = this.disabled;
    this.addEventListener('input', this._handleInputEvent, true);
  }

  _handleInputEvent(e) {
    console.log(e.path[0].checked);
    this.checked = e.path[0].checked;

    // debugger;
  }

  _handleChange(e) {
    // let event = new Event('change', {
    //   bubbles: true,
    //   composed: true,
    //   // cancelable: false,
    // });
    // this.dispatchEvent(event);
    // console.log('DOLPHIN _handleChange', e, e.currentTarget);
  }

  _handleInput(e) {
    // this.dispatchEvent(e);
    // console.log('DOLPHIN _handleInput', e, e.currentTarget);
  }

}

export {
  Checkbox,
};

window.customElements.define('mdwc-checkbox', Checkbox);
