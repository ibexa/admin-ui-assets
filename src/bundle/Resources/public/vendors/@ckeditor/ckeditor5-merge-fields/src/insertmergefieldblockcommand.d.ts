/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { Command } from 'ckeditor5/src/core.js';
/**
 * The insert merge field block element command.
 *
 * The command is registered by {@link module:merge-fields/mergefieldsediting~MergeFieldsEditing} as `'insertMergeFieldBlock'`.
 *
 * To insert a merge field block element, execute the command passing the merge field id as a parameter:
 *
 * ```ts
 * editor.execute( 'insertMergeFieldBlock', 'currentOffer' );
 * ```
 */
export default class InsertMergeFieldBlockCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * Inserts a new merge field block element with the given `id` attribute at the current selection.
     *
     * @fires execute
     */
    execute(mergeFieldId: string, findOptimalPosition?: boolean): void;
}
