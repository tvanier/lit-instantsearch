import { html } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { AisElement } from './ais-element.js';

export class AisHits extends AisElement {
  static get properties() { 
    return { 
      hits: { type: Array },
      renderHit: { attribute: false }
    };
  }

  constructor() {
    super();
    this.hits = [];
  }

  renderHeader() {
    if (this.hits.length) {
      return html`
        <p>${this.hits.length} hit(s)</p>
      `
    }

    return null;
  }

  doRenderHit(hit) {
    if (this.renderHit) {
      return html`<li>${this.renderHit(hit)}</li>`;
    }

    return html`<li>hit ${hit.objectID}</li>`
  }

  render() {
    return html`
      ${this.renderHeader()}
      <ul>
      ${repeat(this.hits, hit => hit.objectID, hit => this.doRenderHit(hit))}
      </ul>
    `
  }
}

customElements.define('ais-hits', AisHits);