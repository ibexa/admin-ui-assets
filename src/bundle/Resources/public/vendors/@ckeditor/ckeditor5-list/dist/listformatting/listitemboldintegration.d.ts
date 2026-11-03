/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listformatting/listitemboldintegration
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ListEditing } from "../list/listediting.js";
/**
* The list item bold integration plugin.
*/
export declare class ListItemBoldIntegration extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ListItemBoldIntegration";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ListEditing]>;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* @inheritDoc
	*/
	afterInit(): void;
}
