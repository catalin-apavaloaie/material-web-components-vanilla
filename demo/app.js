import {
  LitElement,
  html
} from 'lit-element';

import '@dolphin-kiss/material-wc-button';
import '@dolphin-kiss/material-wc-card';
import '@dolphin-kiss/material-wc-checkbox';
import '@dolphin-kiss/material-wc-select';

class DemoApp extends LitElement {
  render() {
    return html `

      <style>
        mdwc-card {
          margin-bottom: 16px;
        }

        mdwc-select {
          width: 300px;
        }

        select {
          width: 100px;
        }


      </style>

      <h1>mdwc-button</h1>
      <h2>Normal</h2>
      <mdwc-card>
        <mdwc-button>Normal</mdwc-button>
      </mdwc-card>
      <mdwc-card>
        <mdwc-button raised>Raised</mdwc-button>
      </mdwc-card>

      <mdwc-card><h1>Normal</h1></mdwc-card>
      <mdwc-card raised><h1>Raised</h1></mdwc-card>
      <mdwc-checkbox disabled></mdwc-checkbox>

      <select>
      <option value="grains">
          Bread, Cereal, Rice, and Pasta
        </option>
        <option value="vegetables">
          Vegetables
        </option>
        <option value="fruit">
          Fruit
        </option>
      </select>

      <mdwc-select 
        label="What do you want?"
        @change="${this._handleChange}" 
        @input="${this._handleInput}"
        @value-updated="${this._handleValueUpdated}"
        .options="${[{value: "grains", label: "Bread"}, {value: "vegetables", label: "Vegetables"}, {value: "fruit", label: "Fruit"}]}">
      </mdwc-select>

      <span @click="${() => this._runVisibilityToggle = !this._runVisibilityToggle}">
        ${this._runVisibilityToggle ? html `Pause` : html `Start`}
      </span>
      <mdwc-select outlined 
        label="OUTLINED AND PRESELECTED" 
        id="hiddenOne"
        style="display: none"
        @change="${this._handleChange}" 
        @input="${this._handleInput}"
        @value-updated="${this._handleValueUpdated}"
        keyForValue="uuid"
        keyForLabel="name"
        value="vegetables"
        .options="${[{uuid: "grains", name: "Breadz", isNice: true}, {uuid: "vegetables", name: "Vegetables", isNice: false}, {uuid: "fruit", name: "Fruit", isNice: undefined}]}">
      </mdwc-select>

      <mdwc-select 
        label="What do you want?"
        @change="${this._handleChange}" 
        @input="${this._handleInput}"
        @value-updated="${this._handleValueUpdated}"
        value="vegetables"
        .options="${[{value: "grains", label: "Bread"}, {value: "vegetables", label: "Vegetables"}, {value: "fruit", label: "Fruit"}]}">
      </mdwc-select>

      <mdwc-select outlined 
        label="Super long long super label something!" 
        @change="${this._handleChange}" 
        @input="${this._handleInput}"
        @value-updated="${this._handleValueUpdated}"
        keyForValue="uuid"
        keyForLabel="name"
        value="fruit"
        .options="${[{uuid: "grains", name: "Breadz", isNice: true}, {uuid: "vegetables", name: "Vegetables", isNice: false}, {uuid: "fruit", name: "Fruit", isNice: undefined}]}">
      </mdwc-select>

      <mdwc-select
        disabled
        label="What do you want?"
        @change="${this._handleChange}" 
        @input="${this._handleInput}"
        @value-updated="${this._handleValueUpdated}"
        .options="${[{value: "grains", label: "Bread"}, {value: "vegetables", label: "Vegetables"}, {value: "fruit", label: "Fruit"}]}">
      </mdwc-select>

      <mdwc-select id="select-disabled-outlined" outlined
        disabled
        label="Disabled option that will be enabled after 2 seconds." 
        @change="${this._handleChange}" 
        @input="${this._handleInput}"
        @value-updated="${this._handleValueUpdated}"
        keyForValue="uuid"
        keyForLabel="name"
        value="somethingnotinthelist"
        .options="${[{uuid: "grains", name: "Breadz", isNice: true}, {uuid: "vegetables", name: "Vegetables", isNice: false}, {uuid: "fruit", name: "Fruit", isNice: undefined}]}">
      </mdwc-select>


    `;
  }

  static get properties() {
    return {
      _runVisibilityToggle: {
        type: Boolean,
      },
    };
  }

  firstUpdated() {
    window.setTimeout(() => {
      this.shadowRoot.getElementById('select-disabled-outlined')
        .disabled = false;
    }, 2000);
    setInterval(() => {
      if (this._runVisibilityToggle) {
        let hiddenOne = this.shadowRoot.getElementById('hiddenOne');
        if (hiddenOne.style.display == 'none') {
          hiddenOne.style.display = '';
        } else {
          hiddenOne.style.display = 'none';
        }
      }
    }, 2000);
  }

  _appendOptionToSelect(selectId) {
    // window.setInterval(() => {
    //   // console.log('hello');
    //   let option = document.createElement('option');
    //   option.value = 'optionvalue';
    //   option.innerHTML = 'optiontext';
    //   this.shadowRoot.getElementById(selectId)
    //     .append(option);
    // }, 1000);
  }

  _handleChange(e) {
    console.log('_handleChange', e.currentTarget.checked, e.currentTarget.value, e.currentTarget);
  }

  _handleInput(e) {
    console.log('_handleInput', e.currentTarget.checked, e.currentTarget.value, e.currentTarget);
  }

  _handleValueUpdated(e) {
    console.log('_handleValueUpdated', e, e.detail, e.currentTarget);
  }

  _nativeFormSubmit(e) {
    e.preventDefault();
    let formData = new FormData(this.shadowRoot.getElementById('native-form'));
    console.log(Array.from(formData.keys()));
    console.log(Array.from(formData.values()));
  }
}

window.customElements.define('demo-app', DemoApp);
