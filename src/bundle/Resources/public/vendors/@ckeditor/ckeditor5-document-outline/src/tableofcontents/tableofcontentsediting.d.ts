/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/tableofcontents/tableofcontentsediting
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { Widget } from 'ckeditor5/src/widget.js';
import '../../theme/tableofcontents.css';
import DocumentOutlineUtils from '../documentoutline/documentoutlineutils.js';
import HeadingId from './headingid.js';
/**
 * The table of contents editing plugin.
 */
export default class TableOfContentsEditing extends Plugin {
    /**
     * @inheritDoc
     */
    static get pluginName(): "TableOfContentsEditing";
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
    static get requires(): readonly [typeof Widget, typeof DocumentOutlineUtils, typeof HeadingId];
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    init(): void;
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
