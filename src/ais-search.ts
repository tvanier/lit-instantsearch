import { html, internalProperty, property, TemplateResult } from 'lit-element';
// import algoliasearch from 'algoliasearch/dist/algoliasearch.esm.browser';
import algoliasearch, { SearchClient, SearchIndex } from 'algoliasearch';
import { Hit } from '@algolia/client-search';
import { AisElement } from './ais-element';
import './ais-search-box';
import './ais-hits';

export interface AisSearchConfig {
  name: string;
  applicationId: string;
  apiKey: string;
  indexName: string;
  renderHit<H>(hit: Hit<H>): TemplateResult
}

type SearchParams = Parameters<SearchIndex['search']>[1]

export class AisSearch<H = any> extends AisElement {
  @property({ type: Object })
  config: AisSearchConfig | undefined

  @internalProperty() hits: Hit<H>[] = []

  client: SearchClient | undefined
  index: SearchIndex | undefined

  updated() {
    if (this.config) {
      this.client = algoliasearch(this.config.applicationId, this.config.apiKey);
      this.index = this.client.initIndex(this.config.indexName);
    }
  }

  async search(query: string, params?: SearchParams) {
    const response = await this.index?.search<H>(query, params);
    if (response) {
      const { hits, nbHits, page, nbPages } = response;
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
  }

  async startSearch(query: string) {
    this.hits = [];
    await this.requestUpdate();
    await this.search(query);
  }

  renderSearch() {
    return html`
      <ais-search-box @query=${(e: CustomEvent) => this.startSearch(e.detail.query)}></ais-search-box>
      <ais-hits .hits=${this.hits} .renderHit=${this.config?.renderHit}></ais-hits>
    `
  }

  render() {
    return html`
      <h1>Ais Search ${this.config?.name ?? ''}</h1>
      ${this.config ? this.renderSearch() : html`<p>Missing config</p>`}
      <slot></slot>
    `
  }
}

customElements.define('ais-search', AisSearch);
