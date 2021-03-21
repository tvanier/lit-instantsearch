import { TemplateResult } from 'lit-element';
import { Hit } from '@algolia/client-search';
import { AisElement } from './ais-element';
declare type HitRenderer = <H>(hit: Hit<H>) => TemplateResult;
export declare class AisHits<H = any> extends AisElement {
    hits: Hit<H>[];
    renderHit: HitRenderer;
    renderHeader(): TemplateResult | null;
    render(): TemplateResult;
}
export {};
