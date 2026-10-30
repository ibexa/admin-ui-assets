/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tablecaption
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { TableCaptionEditing } from "./tablecaption/tablecaptionediting.js";
import { TableCaptionUI } from "./tablecaption/tablecaptionui.js";
/**
* The table caption plugin.
*/
export declare class TableCaption extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TableCaption";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[TableCaptionEditing, TableCaptionUI]>;
}
