/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type Editor, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import type { ModelElement } from "@ckeditor/ckeditor5-engine";
import { TableEditing } from "../tableediting.js";
/**
* The table scrolling editing plugin.
*/
export declare class TableScrollEditing extends Plugin {
	/**
	* Used to listen to native DOM events.
	*/
	private _domEmitter;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TableScrollEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[TableEditing]>;
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
	override destroy(): void;
	/**
	* Whether a given table may overflow its container and become horizontally scrollable, and whether
	* column/table resizing is allowed to grow it past the container's width.
	*
	* @internal
	*/
	_isTableScrollable(table: ModelElement): boolean;
	/**
	* Determines whether a table overflows its container and applies the corresponding view state:
	* the `ck-table-overflowing` class on the figure, and the actual (possibly container-exceeding)
	* width on the inner `<table>` and a sibling `<figcaption>`, if present.
	*
	* @internal
	*/
	_updateTableScrollOverflowState(table: ModelElement, tableWidthOverride?: string | null): void;
	/**
	* Schedules a re-read of the widget figure's actual `scrollLeft` into `--ck-table-scroll-offset`, once
	* the render reflecting the change that triggered it has actually happened - see the call site for why
	* this can't just read (and force a reflow for) `scrollLeft` immediately instead.
	*/
	private _scheduleScrollOffsetSync;
	/**
	* Registers editing-only downcast listeners that keep overflow state in sync.
	*/
	private _registerConversion;
	/**
	* Keeps every overflowing table's `--ck-table-scroll-offset` custom property in sync with its
	* `scrollLeft`, using a single delegated listener instead of one native listener per table.
	*/
	private _watchFiguresScroll;
	/**
	* Listen for column resize events and updates proper view element size.
	*/
	private _watchColumnResize;
	/**
	* Re-evaluates the overflow state of every table whenever the window or an editing root is resized.
	*/
	private _watchRootEditables;
	/**
	* Evaluates the overflow state of every newly inserted table.
	*/
	private _watchNewTables;
}
