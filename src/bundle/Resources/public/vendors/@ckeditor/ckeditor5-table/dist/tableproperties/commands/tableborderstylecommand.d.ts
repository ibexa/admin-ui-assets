/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tableproperties/commands/tableborderstylecommand
*/
import type { ModelElement } from "@ckeditor/ckeditor5-engine";
import { TablePropertyCommand } from "./tablepropertycommand.js";
import type { Editor } from "@ckeditor/ckeditor5-core";
/**
* The table style border command.
*
* The command is registered by the {@link module:table/tableproperties/tablepropertiesediting~TablePropertiesEditing} as
* the `'tableBorderStyle'` editor command.
*
* To change the border style of the selected table, execute the command:
*
* ```ts
* editor.execute( 'tableBorderStyle', {
*   value: 'dashed'
* } );
* ```
*/
export declare class TableBorderStyleCommand extends TablePropertyCommand {
	/**
	* Creates a new `TableBorderStyleCommand` instance.
	*
	* @param editor An editor in which this command will be used.
	* @param defaultValue The default value of the attribute.
	*/
	constructor(editor: Editor, defaultValue: string);
	/**
	* @inheritDoc
	*/
	protected override _getValue(table: ModelElement): unknown;
}
