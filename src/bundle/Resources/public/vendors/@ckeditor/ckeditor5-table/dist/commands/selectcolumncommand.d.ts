/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/commands/selectcolumncommand
*/
import { Command, type Editor } from "@ckeditor/ckeditor5-core";
/**
* The select column command.
*
* The command is registered by {@link module:table/tableediting~TableEditing} as the `'selectTableColumn'` editor command.
*
* To select the columns containing the selected cells, execute the command:
*
* ```ts
* editor.execute( 'selectTableColumn' );
* ```
*/
export declare class SelectColumnCommand extends Command {
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
