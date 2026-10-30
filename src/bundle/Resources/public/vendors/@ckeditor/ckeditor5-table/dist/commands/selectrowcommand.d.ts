/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/commands/selectrowcommand
*/
import { Command, type Editor } from "@ckeditor/ckeditor5-core";
/**
* The select row command.
*
* The command is registered by {@link module:table/tableediting~TableEditing} as the `'selectTableRow'` editor command.
*
* To select the rows containing the selected cells, execute the command:
*
* ```ts
* editor.execute( 'selectTableRow' );
* ```
*/
export declare class SelectRowCommand extends Command {
	/**
	* @inheritDoc
	*/
	constructor(editor: Editor);
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* @inheritDoc
	*/
	override execute(): void;
}
