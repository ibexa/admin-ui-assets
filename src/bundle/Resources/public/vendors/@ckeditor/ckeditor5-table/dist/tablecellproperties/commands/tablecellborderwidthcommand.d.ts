/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tablecellproperties/commands/tablecellborderwidthcommand
*/
import type { Editor } from "@ckeditor/ckeditor5-core";
import type { ModelElement } from "@ckeditor/ckeditor5-engine";
import { TableCellPropertyCommand } from "./tablecellpropertycommand.js";
/**
* The table cell border width command.
*
* The command is registered by the {@link module:table/tablecellproperties/tablecellpropertiesediting~TableCellPropertiesEditing} as
* the `'tableCellBorderWidth'` editor command.
*
* To change the border width of selected cells, execute the command:
*
* ```ts
* editor.execute( 'tableCellBorderWidth', {
*   value: '5px'
* } );
* ```
*
* **Note**: This command adds the default `'px'` unit to numeric values. Executing:
*
* ```ts
* editor.execute( 'tableCellBorderWidth', {
*   value: '5'
* } );
* ```
*
* will set the `borderWidth` attribute to `'5px'` in the model.
*/
export declare class TableCellBorderWidthCommand extends TableCellPropertyCommand {
	/**
	* Creates a new `TableCellBorderWidthCommand` instance.
	*
	* @param editor An editor in which this command will be used.
	* @param defaultValue The default value of the attribute.
	*/
	constructor(editor: Editor, defaultValue: string);
	/**
	* @inheritDoc
	*/
	protected override _getAttribute(tableCell: ModelElement): unknown;
	/**
	* @inheritDoc
	*/
	protected override _getValueToSet(value: string | number | undefined): unknown;
}
