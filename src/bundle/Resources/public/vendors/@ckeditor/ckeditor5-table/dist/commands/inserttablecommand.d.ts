/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/commands/inserttablecommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
/**
* The insert table command.
*
* The command is registered by {@link module:table/tableediting~TableEditing} as the `'insertTable'` editor command.
*
* To insert a table at the current selection, execute the command and specify the dimensions:
*
* ```ts
* editor.execute( 'insertTable', { rows: 20, columns: 5 } );
* ```
*/
export declare class InsertTableCommand extends Command {
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Executes the command.
	*
	* Inserts a table with the given number of rows and columns into the editor.
	*
	* @param options.rows The number of rows to create in the inserted table. Default value is 2.
	* @param options.columns The number of columns to create in the inserted table. Default value is 2.
	* @param options.headingRows The number of heading rows. If not provided it will default to
	* {@link module:table/tableconfig~TableConfig#defaultHeadings `config.table.defaultHeadings.rows`} table config.
	* @param options.headingColumns The number of heading columns. If not provided it will default to
	* {@link module:table/tableconfig~TableConfig#defaultHeadings `config.table.defaultHeadings.columns`} table config.
	* @param options.footerRows The number of footer rows. If not provided it will default to
	* {@link module:table/tableconfig~TableConfig#defaultFooters `config.table.defaultFooters`} table config.
	* This option is ignored when {@link module:table/tableconfig~TableConfig#enableFooters `config.table.enableFooters`} is `false`.
	* @param options.inheritTextFormattingAttributes Whether every empty cell should inherit the `copyOnEnter` text
	* formatting attributes (e.g. bold, font color) that were uniformly active in the content right before
	* the table, so that whichever cell the user starts typing in first continues that formatting. Defaults
	* to `true`.
	* @fires execute
	*/
	override execute(options?: {
		rows?: number;
		columns?: number;
		headingRows?: number;
		headingColumns?: number;
		footerRows?: number;
		inheritTextFormattingAttributes?: boolean;
	}): void;
}
