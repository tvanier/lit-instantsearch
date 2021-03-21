import { html, property, TemplateResult } from 'lit-element';
import { repeat } from 'lit-html/directives/repeat';
import { Hit } from '@algolia/client-search';
import { AisElement } from './ais-element';

type HitRenderer = <H>(hit: Hit<H>) => TemplateResult

export class AisHits<H = any> extends AisElement {

  @property({ type: Array}) hits: Hit<H>[] = []

  @property({ attribute: false }) renderHit: HitRenderer = (hit) => html`hit ${hit.objectID}`

  renderHeader() {
    if (this.hits.length) {
      return html`
        <p>${this.hits.length} hit(s)</p>
      `
    }

    return null;
  }

  render() {
    return html`
      ${this.renderHeader()}
      <ul>
      ${repeat(this.hits, hit => hit.objectID, hit => html`
        <li>${this.renderHit(hit)}</li>
      `)}
      </ul>
    `
  }
}

customElements.define('ais-hits', AisHits);