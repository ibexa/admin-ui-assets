/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/table
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Widget } from "@ckeditor/ckeditor5-widget";
import { TableEditing } from "./tableediting.js";
import { TableUI } from "./tableui.js";
import { TableSelection } from "./tableselection.js";
import { TableClipboard } from "./tableclipboard.js";
import { TableKeyboard } from "./tablekeyboard.js";
import { TableMouse } from "./tablemouse.js";
/**
* The table plugin.
*
* For a detailed overview, check the {@glink features/tables/tables Table feature documentation}.
*
* This is a "glue" plugin that loads the following table features:
*
* * {@link module:table/tableediting~TableEditing editing feature},
* * {@link module:table/tableselection~TableSelection selection feature},
* * {@link module:table/tablekeyboard~TableKeyboard keyboard navigation feature},
* * {@link module:table/tablemouse~TableMouse mouse selection feature},
* * {@link module:table/tableclipboard~TableClipboard clipboard feature},
* * {@link module:table/tableui~TableUI UI feature}.
*/
export declare class Table extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[TableEditing, TableUI, TableSelection, TableMouse, TableKeyboard, TableClipboard, Widget]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "Table";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
