/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module track-changes/commands/previewfinalcontentcommand
 * @publicApi
 */
import { Command, type Editor } from 'ckeditor5/src/core.js';
/**
 * A command that displays a dialog with the document preview where all the suggestions are accepted.
 */
export default class PreviewFinalContentCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * @inheritDoc
     */
    execute(): void;
}
