/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module pagination/paginationlookup
 */
import type { Range } from 'ckeditor5/src/engine.js';
import { Plugin } from 'ckeditor5/src/core.js';
/**
 * The pagination lookup plugin.
 */
export default class PaginationLookup extends Plugin {
    /**
     * List of the page breaks.
     *
     * @observable
     * @default []
     * @readonly
     */
    pageBreaks: Array<PageBreakInfo>;
    /**
     * @inheritDoc
     */
    static get pluginName(): "PaginationLookup";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
/**
 * Single page break information.
 */
export declare class PageBreakInfo {
    readonly type: 'manual' | 'element' | 'text';
    readonly modelRange: Range;
    /**
     * Creates PageBreakInfo instance.
     */
    constructor({ type, modelRange, domNode, offset }: {
        readonly type: PageBreakInfo['type'];
        readonly modelRange: PageBreakInfo['modelRange'];
        readonly domNode: Node;
        readonly offset: number;
    });
    /**
     * The top offset in window coordinates.
     */
    get offset(): number;
}
