/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/list
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ListEditing } from "./list/listediting.js";
import { ListUI } from "./list/listui.js";
/**
* The list feature.
*
* This is a "glue" plugin that loads the {@link module:list/list/listediting~ListEditing  list
* editing feature} and {@link module:list/list/listui~ListUI list UI feature}.
*/
export declare class List extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ListEditing, ListUI]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "List";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
