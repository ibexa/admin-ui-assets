/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tablecolumnresize/commands/tablecolumnwidthcommand
*/
import { Command } from "@ckeditor/ckeditor5-core";
import type { Batch } from "@ckeditor/ckeditor5-engine";
/**
* The table column width command.
*
* The command is registered by the {@link module:table/tablecolumnresize/tablecolumnresizeediting~TableColumnResizeEditing}
* as the `'tableColumnWidth'` editor command.
*
* It sets the width of every column covered by the selected cells (keeping the whole table's width mode consistent),
* so the change actually takes effect in a resized table - where a per-cell width would be shadowed by the column
* group. The command is enabled whenever the selection maps onto the columns of a resized, regular table.
*
* ```ts
* editor.execute( 'tableColumnWidth', {
*   value: '150px'
* } );
* ```
*
* **Note**: This command adds a default `'px'` unit to numeric values. Executing:
*
* ```ts
* editor.execute( 'tableColumnWidth', {
*   value: '150'
* } );
* ```
*
* will set the column width to `'150px'`.
*/
export declare class TableColumnWidthCommand extends Command {
	/**
	* The width of the first column covered by the selection, or `null` when the selection does not map onto table
	* columns (for example when there is no cell selected or the table is not resized).
	*
	* @readonly
	* @observable
	*/
	value: string | null;
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* @inheritDoc
	*/
	override execute(options?: {
		value?: string | number;
		batch?: Batch;
	}): void;
}
