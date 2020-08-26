import { html } from 'lit-element';
import algoliasearch from 'algoliasearch/dist/algoliasearch.esm.browser.js';
import { AisElement } from './ais-element.js';
import './ais-search-box.js';
import './ais-hits.js';

export class AisSearch extends AisElement {
  static get properties() { 
    return { 
      config: { type: Object },
    };
  }

  constructor() {
    super();
    this.hits = []
  }

  updated() {
    if (this.config) {
      this.client = algoliasearch(this.config.applicationId, this.config.apiKey);
      this.index = this.client.initIndex(this.config.indexName);
    }
  }

  async search(query, params) {
    const { hits, nbHits, page, nbPages } = await this.index.search(query, params);
    this.hits = (this.hits || []).concat(hits);
    console.log(this.hits.length, page, nbPages)
    this.requestUpdate();

    if (this.hits.length < nbHits && page < nbPages) {
      await this.search(query, {
        ...params,
        page: page + 1
      })
    }
  }

  async startSearch(query) {
    this.hits = [];
    await this.requestUpdate();
    await this.search(query);
  }

  renderSearch() {
    return html`
      <ais-search-box @query=${e => this.startSearch(e.detail.query)}></ais-search-box>
      <ais-hits .hits=${this.hits} .renderHit=${this.config.renderHit}></ais-hits>
    `
  }

  render() {
    return html`
      <h1>Ais Search ${this.config ? this.config.name : null}</h1>
      ${this.config ? this.renderSearch() : html`<p>Missing config</p>`}
      <slot></slot>
    `
  }
}

customElements.define('ais-search', AisSearch);
