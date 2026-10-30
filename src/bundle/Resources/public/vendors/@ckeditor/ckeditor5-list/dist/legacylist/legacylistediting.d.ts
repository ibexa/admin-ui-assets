/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { LegacyListUtils } from "./legacylistutils.js";
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Enter } from "@ckeditor/ckeditor5-enter";
import { Delete } from "@ckeditor/ckeditor5-typing";
/**
* The engine of the list feature. It handles creating, editing and removing lists and list items.
*
* It registers the `'numberedList'`, `'bulletedList'`, `'indentList'` and `'outdentList'` commands.
*/
export declare class LegacyListEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "LegacyListEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[Enter, Delete, LegacyListUtils]>;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* @inheritDoc
	*/
	afterInit(): void;
}
