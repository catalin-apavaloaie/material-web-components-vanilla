import {
  LitElement,
  html
} from 'lit-element';

import '@dolphin-kiss/material-wc-button';
import '@dolphin-kiss/material-wc-card';

class DemoApp extends LitElement {
  render() {
    return html `

      <style>
        mdwc-card {
          margin-bottom: 16px;
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
    `;
  }
}

window.customElements.define('demo-app', DemoApp);
