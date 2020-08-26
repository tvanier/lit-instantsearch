import { html } from 'lit-element'
import { config as commonConfig } from './common.js';

export const config = {
  ...commonConfig,
  name: 'Tourism',
  indexName:'airbnb',
  renderHit(hit) {
    return html`${hit.name}, ${hit.city} (${hit.country})`
  }
}