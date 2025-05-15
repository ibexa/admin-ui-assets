/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module merge-fields/previewmergefieldscommand
 * @publicApi
 */
import { Command, type Editor } from 'ckeditor5/src/core.js';
/**
 * The merge fields preview command.
 *
 * The command is registered by {@link module:merge-fields/mergefieldsediting~MergeFieldsEditing} as `'previewMergeFields'`.
 *
 * To change the current merge fields preview mode, execute the command passing the preview name as a parameter:
 *
 * ```ts
 * editor.execute( 'previewMergeFields', '$defaultValues' );
 * ```
 *
 * This command is a simple wrapper for {@link module:merge-fields/mergefieldsediting~MergeFieldsEditing#previewMode}. It binds its
 * {@link #value} to {@link module:merge-fields/mergefieldsediting~MergeFieldsEditing#previewMode} and changes
 * {@link module:merge-fields/mergefieldsediting~MergeFieldsEditing#previewMode} when the command is executed.
 */
export default class PreviewMergeFieldsCommand extends Command {
    /**
     * A name of the current merge fields preview mode.
     *
     * @observable
     * @readonly
     */
    value: string;
    constructor(editor: Editor);
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * Sets the current merge fields preview mode. If it is not one of the available ones, plugin will throw an error.
     *
     * @fires execute
     */
    execute(previewId: string): void;
}
