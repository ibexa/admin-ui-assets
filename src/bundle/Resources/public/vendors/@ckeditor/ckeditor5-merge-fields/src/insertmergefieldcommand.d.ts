/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module merge-fields/insertmergefieldcommand
 * @publicApi
 */
import { Command } from 'ckeditor5/src/core.js';
/**
 * The insert merge field element command.
 *
 * The command is registered by {@link module:merge-fields/mergefieldsediting~MergeFieldsEditing} as `'insertMergeField'`.
 *
 * To insert a merge field element at the current selection, execute the command passing the merge field id as a parameter:
 *
 * ```ts
 * editor.execute( 'insertMergeField', 'clientName' );
 * ```
 */
export default class InsertMergeFieldCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * Inserts a new merge field element with the given `id` attribute at the current selection.
     *
     * @fires execute
     */
    execute(mergeFieldId: string): void;
}
