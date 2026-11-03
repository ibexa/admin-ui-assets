/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/commands/removecolumncommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
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
export declare class RemoveColumnCommand extends Command {
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* @inheritDoc
	*/
	override execute(): void;
}
