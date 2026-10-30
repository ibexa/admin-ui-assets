/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tablescroll
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { TableScrollEditing } from "./tablescroll/tablescrollediting.js";
export declare class TableScroll extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TableScroll";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[TableScrollEditing]>;
}
