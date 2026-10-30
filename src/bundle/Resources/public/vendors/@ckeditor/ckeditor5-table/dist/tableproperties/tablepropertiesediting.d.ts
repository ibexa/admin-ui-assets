/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tableproperties/tablepropertiesediting
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { TableEditing } from "../tableediting.js";
/**
* The table properties editing feature.
*
* Introduces table's model attributes and their conversion:
*
* - border: `tableBorderStyle`, `tableBorderColor` and `tableBorderWidth`
* - background color: `tableBackgroundColor`
* - horizontal alignment: `tableAlignment`
* - width & height: `tableWidth` & `tableHeight`
*
* It also registers commands used to manipulate the above attributes:
*
* - border: `'tableBorderStyle'`, `'tableBorderColor'` and `'tableBorderWidth'` commands
* - background color: `'tableBackgroundColor'`
* - horizontal alignment: `'tableAlignment'`
* - width & height: `'tableWidth'` & `'tableHeight'`
*/
export declare class TablePropertiesEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TablePropertiesEditing";
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
	static get requires(): PluginDependenciesOf<[TableEditing]>;
	/**
	* @inheritDoc
	*/
	init(): void;
}
