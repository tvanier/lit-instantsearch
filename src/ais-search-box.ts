import { html } from 'lit-element';
import { AisElement } from './ais-element';

export class AisSearchBox extends AisElement {
  onChange(event: Event) {
    console.log('onChange', event)
    const queryEvent = new CustomEvent('query', {
      bubbles: true,
      composed: true,
      detail: { query: (event.target as HTMLInputElement).value }
    });
    this.dispatchEvent(queryEvent);
  }

  render() {
    return html`
      <form class="ais-SearchBox" @submit=${(event: Event) => event.preventDefault()}>
        <input class="ais-SearchBox-input" @change=${this.onChange} type="text" />
      </form>
    `
  }
}

customElements.define('ais-search-box', AisSearchBox);
