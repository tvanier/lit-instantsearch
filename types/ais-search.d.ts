import { TemplateResult } from 'lit-element';
import { SearchClient, SearchIndex } from 'algoliasearch';
import { Hit } from '@algolia/client-search';
import { AisElement } from './ais-element';
import './ais-search-box';
import './ais-hits';
export interface AisSearchConfig {
    name: string;
    applicationId: string;
    apiKey: string;
    indexName: string;
    renderHit<H>(hit: Hit<H>): TemplateResult;
}
declare type SearchParams = Parameters<SearchIndex['search']>[1];
export declare class AisSearch<H = any> extends AisElement {
    config: AisSearchConfig | undefined;
    hits: Hit<H>[];
    client: SearchClient | undefined;
    index: SearchIndex | undefined;
    updated(): void;
    search(query: string, params?: SearchParams): Promise<void>;
    startSearch(query: string): Promise<void>;
    renderSearch(): TemplateResult;
    render(): TemplateResult;
}
export {};
