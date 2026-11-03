/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tablelayout
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { TableLayoutUI } from "./tablelayout/tablelayoutui.js";
import { TableLayoutEditing } from "./tablelayout/tablelayoutediting.js";
import { TableColumnResize } from "./tablecolumnresize.js";
/**
* The table plugin.
*
* For a detailed overview, check the {@glink features/tables/layout-tables Layout table feature documentation}.
*/
export declare class TableLayout extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TableLayout";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[TableColumnResize, TableLayoutEditing, TableLayoutUI]>;
}
