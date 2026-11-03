/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/commands/inserttablelayoutcommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The insert table layout command.
*
* The command is registered by {@link module:table/tablelayout/tablelayoutediting~TableLayoutEditing}
* as the `'insertTableLayout'` editor command.
*
* To insert a layout table at the current selection, execute the command and specify the dimensions:
*
* ```ts
* editor.execute( 'insertTableLayout', { rows: 20, columns: 5 } );
* ```
*/
export declare class InsertTableLayoutCommand extends Command {
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command.
	*
	* Inserts a layout table with the given number of rows and columns into the editor.
	*
	* @param options.rows The number of rows to create in the inserted table. Default value is 2.
	* @param options.columns The number of columns to create in the inserted table. Default value is 2.
	* @param options.inheritTextFormattingAttributes Whether every empty cell should inherit the `copyOnEnter` text
	* formatting attributes (e.g. bold, font color) that were uniformly active in the content right before
	* the table, so that whichever cell the user starts typing in first continues that formatting. Defaults
	* to `true`.
	* @fires execute
	*/
	override execute(options?: {
		rows?: number;
		columns?: number;
		inheritTextFormattingAttributes?: boolean;
	}): void;
}
