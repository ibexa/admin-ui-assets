/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module table/commands/removecolumncommand
 */
import { Command } from 'ckeditor5/src/core.js';
/**
 * The remove column command.
 *
 * The command is registered by {@link module:table/tableediting~TableEditing} as the `'removeTableColumn'` editor command.
 *
 * To remove the column containing the selected cell, execute the command:
 *
 * ```ts
 * editor.execute( 'removeTableColumn' );
 * ```
 */
export default class RemoveColumnCommand extends Command {
    /**
     * @inheritDoc
     */
    refresh(): void;
    /**
     * @inheritDoc
     */
    execute(): void;
}
