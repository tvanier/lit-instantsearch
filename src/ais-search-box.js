import { html } from 'lit-element';
import { AisElement } from './ais-element.js';

export class AisSearchBox extends AisElement {
  onChange(event) {
    console.log('onChange', event)
    const queryEvent = new CustomEvent('query', {
      bubbles: true,
      composed: true,
      detail: { query: event.target.value }
    });
    this.dispatchEvent(queryEvent);
  }

  render() {
    return html`
      <form class="ais-SearchBox" @submit=${event => event.preventDefault()}>
        <input class="ais-SearchBox-input" @change=${this.onChange} type="text" />
      </form>
    `
  }
}

customElements.define('ais-search-box', AisSearchBox);
