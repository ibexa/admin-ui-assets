/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type Editor, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import type { ViewDowncastWriter, ModelElement, ModelWriter, ViewElement } from "@ckeditor/ckeditor5-engine";
import { TableEditing } from "../tableediting.js";
import { TableUtils } from "../tableutils.js";
/**
* The table column resize editing plugin.
*/
export declare class TableColumnResizeEditing extends Plugin {
	/**
	* A flag indicating if the column resizing is in progress.
	*
	* @observable
	* @internal
	*/
	_isResizingActive: boolean;
	/**
	* A flag indicating if the column resizing is allowed. It is not allowed if the editor is in read-only
	* or comments-only mode or the `TableColumnResize` plugin is disabled.
	*
	* @observable
	* @internal
	*/
	_isResizingAllowed: boolean;
	/**
	* A temporary storage for the required data needed to correctly calculate the widths of the resized columns. This storage is
	* initialized when column resizing begins, and is purged upon completion.
	*/
	private _resizingData;
	/**
	* DOM emitter.
	*/
	private _domEmitter;
	/**
	* A local reference to the {@link module:table/tableutils~TableUtils} plugin.
	*/
	private _tableUtilsPlugin;
	/**
	* Starting mouse position data used to add a threshold to the resizing process.
	*/
	private _initialMouseEventData;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[TableEditing, TableUtils]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TableColumnResizeEditing";
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode(): string;
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static override get isPremiumPlugin(): true;
	/**
	* @inheritDoc
	*/
	constructor(editor: Editor);
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* @inheritDoc
	*/
	afterInit(): void;
	/**
	* @inheritDoc
	*/
	override destroy(): void;
	/**
	* The table for which a column resize is currently in progress, or `null` if no resize is active.
	* Only one table can be resized at a time.
	*/
	get resizingTable(): ModelElement | null;
	/**
	* Returns a 'tableColumnGroup' element from the 'table'.
	*
	* @param element A 'table' or 'tableColumnGroup' element.
	* @returns A 'tableColumnGroup' element.
	*/
	getColumnGroupElement(element: ModelElement): ModelElement | undefined;
	/**
	* Returns an array of 'tableColumn' elements.
	*
	* @param element A 'table' or 'tableColumnGroup' element.
	* @returns An array of 'tableColumn' elements.
	*/
	getTableColumnElements(element: ModelElement): Array<ModelElement>;
	/**
	* Returns an array of table column widths.
	*
	* @param element A 'table' or 'tableColumnGroup' element.
	* @returns An array of table column widths.
	*/
	getTableColumnsWidths(element: ModelElement): Array<string>;
	/**
	* Returns the table and the sorted, unique indexes of the columns covered by the given cells (a `colspan` cell
	* covers several columns). Returns `null` when the selection cannot be mapped onto columns - a non-resized table
	* or an irregular column structure.
	*
	* @param cells An array of 'tableCell' model elements.
	*/
	getColumnIndexesForCells(cells: Array<ModelElement>): {
		table: ModelElement;
		columnIndexes: Array<number>;
	} | null;
	/**
	* Applies the given width to every column in `columnIndexes`, keeping the whole table's width mode consistent
	* (see {@link module:table/tablecolumnresize/utils~isTableWidthInPixels}).
	*
	* @param writer A model writer instance.
	* @param table A 'table' model element.
	* @param columnIndexes Indexes of the columns the width is applied to.
	* @param value The width to apply. May be expressed in pixels or as a percentage.
	*/
	applyColumnWidths(writer: ModelWriter, table: ModelElement, columnIndexes: Array<number>, value: string): void;
	/**
	* Converts the column widths of a resized table to the unit of the table's own width (`px` or `%`), so a table
	* width change (in the table properties) also switches the columns' unit. It is a no-op when the table is not
	* resized or the columns already use that unit.
	*/
	private _reconcileColumnUnits;
	/**
	* Applies a column width in the percentage mode: the target column gets the (clamped) percentage and the remaining
	* columns are redistributed proportionally so that all the widths keep summing up to 100%.
	*/
	private _applyPercentageColumnWidths;
	/**
	* Applies a width to the target columns in the percentage mode when the selection reaches the last column. As
	* there is no next column to balance against, the table itself grows or shrinks (like dragging the last column's
	* right edge): every other column keeps its absolute width, so expressed against the resized table their
	* percentages scale, and the table's own width scales by the inverse.
	*/
	private _growTableToColumnWidths;
	/**
	* Applies `width` to whichever element currently represents the table's actual width - by default the
	* widget's `<figure>`. Passing `null` clears it instead of setting anything.
	*
	* @internal
	*/
	_setResizingTableWidth(writer: ViewDowncastWriter, viewFigure: ViewElement, width: string | null): void;
	/**
	* Returns the table's current actual width, read from whichever element holds it - by default the
	* widget's `<figure>`.
	*
	* @internal
	*/
	_getResizingTableWidth(viewFigure: ViewElement): string;
	/**
	* Registers new attributes for a table model element.
	*/
	private _extendSchema;
	/**
	* Registers table column resize post-fixer.
	*
	* It checks if the change from the differ concerns a table-related element or attribute. For detected changes it:
	*  * Adjusts the `columnWidths` attribute to guarantee that the sum of the widths from all columns is 100%.
	*  * Checks if the `columnWidths` attribute gets updated accordingly after columns have been added or removed.
	*/
	private _registerPostFixer;
	/**
	* Registers table column resize converters.
	*/
	private _registerConverters;
	/**
	* Registers listeners to handle resizing process.
	*/
	private _registerResizingListeners;
	/**
	* Calculate and set `top` and `bottom` styles to the column resizer element to fit the height of the table.
	*
	* @param viewResizer The column resizer element.
	*/
	private _recalculateResizerElement;
	/**
	* Remove `top` and `bottom` styles of the column resizer element.
	*
	* @param viewResizer The column resizer element.
	*/
	private _resetResizerStyles;
	/**
	* Handles the `mouseover` event on column resizer element.
	* Recalculates the `top` and `bottom` styles of the column resizer element to fit the height of the table.
	*
	* @param eventInfo An object containing information about the fired event.
	* @param domEventData The data related to the DOM event.
	*/
	private _onMouseOverHandler;
	/**
	* Handles the `mouseout` event on column resizer element.
	* When resizing is not active, it resets the `top` and `bottom` styles of the column resizer element.
	*
	* @param eventInfo An object containing information about the fired event.
	* @param domEventData The data related to the DOM event.
	*/
	private _onMouseOutHandler;
	/**
	* Handles the `mousedown` event on column resizer element:
	*  * calculates the initial column pixel widths,
	*  * inserts the `<colgroup>` element if it is not present in the `<table>`,
	*  * puts the necessary data in the temporary storage,
	*  * applies the attributes to the `<table>` view element.
	*
	* @param eventInfo An object containing information about the fired event.
	* @param domEventData The data related to the DOM event.
	*/
	private _onMouseDownHandler;
	/**
	* Starts the resizing process after the threshold is reached.
	*/
	private _startResizingAfterThreshold;
	/**
	* Handles the `mousemove` event.
	*  * If resizing process is not in progress, it does nothing.
	*  * If resizing is active but not allowed, it stops the resizing process instantly calling the `mousedown` event handler.
	*  * Otherwise it dynamically updates the widths of the resized columns.
	*
	* @param eventInfo An object containing information about the fired event.
	* @param mouseEventData The native DOM event.
	*/
	private _onMouseMoveHandler;
	/**
	* Handles the `mouseup` event.
	*  * If resizing process is not in progress, it does nothing.
	*  * If resizing is active but not allowed, it cancels the resizing process restoring the original widths.
	*  * Otherwise it propagates the changes from view to the model by executing the adequate commands.
	*/
	private _onMouseUpHandler;
	/**
	* Retrieves and returns required data needed for the resizing process.
	*
	* @param domEventData The data of the `mousedown` event.
	* @param columnWidths The current widths of the columns.
	* @returns The data needed for the resizing process.
	*/
	private _getResizingData;
	/**
	* Registers a listener ensuring that each resizable cell have a resizer handle.
	*/
	private _registerResizerInserter;
}
/**
* Given the table width a drag would naturally produce, returns the width that should actually be applied
* once snapping and growth resistance around the container's width are taken into account:
*
*  * if the natural width lands close to the container's width (on either side), it's pulled to exactly
*    match it,
*  * if the natural width is past the container's width, it stays pinned at the container's width until the
*    drag has gone far enough beyond it (the "resistance" zone) - past that point it keeps growing 1:1,
*    continuing smoothly from where the resistance was overcome instead of jumping,
*  * shrinking below the container's width is never resisted, only snapped when close.
*
* @internal
*/
export declare function applyContainerWidthResistance(naturalTableWidth: number, containerWidth: number): number;
