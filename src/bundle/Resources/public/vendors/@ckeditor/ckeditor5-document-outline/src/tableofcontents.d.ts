/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/tableofcontents
 * @publicApi
 */
import { Plugin } from 'ckeditor5/src/core.js';
import TableOfContentsEditing from './tableofcontents/tableofcontentsediting.js';
import TableOfContentsUI from './tableofcontents/tableofcontentsui.js';
/**
 * The table of contents feature.
 *
 * For a detailed overview, check the {@glink features/table-of-contents Table of contents} feature documentation.
 */
export default class TableOfContents extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof TableOfContentsEditing, typeof TableOfContentsUI];
    /**
     * @inheritDoc
     */
    static get pluginName(): "TableOfContents";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    /**
     * @inheritDoc
     */
    static get isPremiumPlugin(): true;
}
