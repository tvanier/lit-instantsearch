import { html } from 'lit-element'
import { config as commonConfig } from './common.js';

export const config = {
  ...commonConfig,
  name: 'Media',
  indexName:'movies',
  renderHit(hit) {
    return html`${hit.title}`
  }
}