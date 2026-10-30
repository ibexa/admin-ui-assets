/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { DataFilter } from "../datafilter.js";
/**
* Provides the General HTML Support integration with {@link module:table/table~Table Table} feature.
*/
export declare class TableElementSupport extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[DataFilter]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TableElementSupport";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
