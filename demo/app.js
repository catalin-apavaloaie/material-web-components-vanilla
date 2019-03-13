import {
  LitElement,
  html
} from 'lit-element';

import '@dolphin-kiss/material-wc-button';

class DemoApp extends LitElement {
  render() {
    return html `
      <h1>mdwc-button</h1>
      <h2>Normal</h2>
      <mdwc-button raised>Normal</mdwc-button>
      <h2>Rasied</h2>
      <mdwc-button raised>Raised</mdwc-button>
    `;
  }
}

window.customElements.define('demo-app', DemoApp);
