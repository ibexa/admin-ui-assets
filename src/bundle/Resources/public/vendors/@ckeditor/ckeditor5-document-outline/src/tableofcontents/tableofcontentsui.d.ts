/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Plugin } from 'ckeditor5/src/core.js';
/**
 * The UI plugin of the table of contents feature.
 */
export default class TableOfContentsUI extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "TableOfContentsUI";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
    init(): void;
    /**
     * @inheritDoc
     */
    destroy(): void;
}
