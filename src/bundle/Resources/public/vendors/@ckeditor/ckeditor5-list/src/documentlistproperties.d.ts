/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module list/documentlistproperties
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import ListProperties from './listproperties.js';
/**
 * The document list properties feature.
 *
 * This is an obsolete plugin that exists for backward compatibility only.
 * Use the {@link module:list/listproperties~ListProperties `ListProperties`} instead.
 *
 * @deprecated
 */
export default class DocumentListProperties extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof ListProperties];
    /**
     * @inheritDoc
     */
    static get pluginName(): "DocumentListProperties";
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin(): true;
    constructor(editor: Editor);
}
