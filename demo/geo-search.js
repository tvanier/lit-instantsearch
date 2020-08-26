import { html } from 'lit-element'
import { config as commonConfig } from './common.js';

// https://github.com/algolia/datasets/tree/master/airports
export const config = {
  ...commonConfig,
  name: 'Geo Search',
  indexName:'demo-geosearch',
  renderHit(hit) {
    return html`${hit.iata_code} - ${hit.name}, ${hit.city} (${hit.country})`
  }
}