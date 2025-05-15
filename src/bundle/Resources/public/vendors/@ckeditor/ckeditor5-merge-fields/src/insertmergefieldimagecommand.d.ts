/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module merge-fields/insertmergefieldimagecommand
 * @publicApi
 */
import { Command, type Editor } from 'ckeditor5/src/core.js';
/**
 * The insert merge field image element command.
 *
 * The command is registered by {@link module:merge-fields/mergefieldsediting~MergeFieldsEditing} as `'insertMergeFieldImage'`.
 *
 * To insert a merge field image element at the current selection, execute the command passing the merge field id as a parameter:
 *
 * ```ts
 * editor.execute( 'insertMergeFieldImage', 'companyBanner' );
 * ```
 *
 * It uses the `insertImage` command internally.
 */
export default class InsertMergeFieldImageCommand extends Command {
    /**
     * @inheritDoc
     */
    constructor(editor: Editor);
    /**
     * Inserts a new merge field image element with the given `id` attribute at the current selection.
     * Passing width and height to the `insertImage` command prevents the ImageUtils plugin from trying to load the unexisting image
     * in the `#setImageNaturalSizeAttributes()` function, which is creating the failed network request in the console.
     *
     * @fires execute
     */
    execute(mergeFieldId: string, options?: {
        breakBlock?: boolean;
    }): void;
}
