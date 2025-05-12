/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module pagination/paginationui
 */
import { Plugin } from 'ckeditor5/src/core.js';
/**
 * The pagination UI plugin. It introduces:
 *
 * * The `'pageNavigation'` UI view,
 * * The `'nextPage'` UI button,
 * * The `'previousPage'` UI button.
 */
export default class PaginationUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "PaginationUI";
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
}
