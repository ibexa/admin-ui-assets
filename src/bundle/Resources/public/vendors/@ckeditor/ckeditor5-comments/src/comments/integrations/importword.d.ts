/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/integrations/importword
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
/**
 * Provides comments plugin integration for the import from Word feature.
 */
export default class CommentsImportWord extends Plugin {
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
