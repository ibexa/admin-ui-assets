/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module list/listformatting/listitemfontfamilyintegration
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ListEditing } from "../list/listediting.js";
/**
* The list item font family integration plugin.
*/
export declare class ListItemFontFamilyIntegration extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ListItemFontFamilyIntegration";
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
