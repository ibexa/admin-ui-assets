/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tablecolumnresize/tablewidthscommand
*/
import type { ModelElement } from "@ckeditor/ckeditor5-engine";
import { Command } from "@ckeditor/ckeditor5-core";
/**
* Command used by the {@link module:table/tablecolumnresize~TableColumnResize Table column resize feature} that
* updates the width of the whole table as well as its individual columns.
*/
export declare class TableWidthsCommand extends Command {
	/**
	* @inheritDoc
	*/
	override refresh(): void;
	/**
	* Updated the `tableWidth` attribute of the table and the `columnWidth` attribute of the columns of that table.
	*/
	override execute(options?: TableWidthsCommandOptions): void;
}
export interface TableWidthsCommandOptions {
	/**
	* New value of the `columnWidths` attribute. Must be array of strings or string with comma-separated values.
	* If skipped, the column widths information will be deleted.
	*/
	columnWidths?: Array<string> | string;
	/**
	* The new table width. If skipped, the model attribute will be removed.
	*/
	tableWidth?: string;
	/**
	* The table that is having the columns resized.
	*/
	table?: ModelElement;
}
