/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module comments/integrations/clipboard
 */
import { Plugin, type Editor } from 'ckeditor5/src/core.js';
import { ClipboardPipeline, ClipboardMarkersUtils } from 'ckeditor5/src/clipboard.js';
/**
 * Provides comments plugin integration for the clipboard feature.
 */
export default class CommentsClipboard extends Plugin {
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    static get requires(): readonly [typeof ClipboardMarkersUtils, typeof ClipboardPipeline];
    /**
     * @inheritDoc
     */
    afterInit(): void;
}
