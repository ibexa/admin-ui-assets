/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module list/documentlist
 */
import { Plugin } from 'ckeditor5/src/core.js';
import { logWarning } from 'ckeditor5/src/utils.js';
import List from './list.js';
/**
 * The document list feature.
 *
 * This is an obsolete plugin that exists for backward compatibility only.
 * Use the {@link module:list/list~List `List`} instead.
 *
 * @deprecated
 */
export default class DocumentList extends Plugin {
    /**
     * @inheritDoc
     */
    static get requires() {
        return [List];
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'DocumentList';
    }
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin() {
        return true;
    }
    constructor(editor) {
        super(editor);
        /**
         * The `DocumentList` plugin is obsolete. Use `List` instead.
         *
         * @error plugin-obsolete-documentlist
         */
        logWarning('plugin-obsolete-documentlist', { pluginName: 'DocumentList' });
    }
}
