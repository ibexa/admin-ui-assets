/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
 */
import { Command } from 'ckeditor5/src/core';
/**
 * The merge cells command.
 *
 * The command is registered by {@link module:table/tableediting~TableEditing} as the `'mergeTableCells'` editor command.
 *
 * For example, to merge selected table cells:
 *
 * ```ts
 * editor.execute( 'mergeTableCells' );
 * ```
 */
export default class MergeCellsCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * Executes the command.
     *
     * @fires execute
     */
    execute(): void;
}
