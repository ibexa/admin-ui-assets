/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module markdown-gfm/markdown
 */
import { Plugin } from 'ckeditor5/src/core.js';
import GFMDataProcessor from './gfmdataprocessor.js';
/**
 * The GitHub Flavored Markdown (GFM) plugin.
 *
 * For a detailed overview, check the {@glink features/markdown Markdown feature} guide.
 */
export default class Markdown extends Plugin {
    /**
     * @inheritDoc
     */
    constructor(editor) {
        super(editor);
        editor.data.processor = new GFMDataProcessor(editor.data.viewDocument);
    }
    /**
     * @inheritDoc
     */
    static get pluginName() {
        return 'Markdown';
    }
    /**
     * @inheritDoc
     */
    static get isOfficialPlugin() {
        return true;
    }
}
