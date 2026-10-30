/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module html-support/integrations/customelement
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { DataSchema } from "../dataschema.js";
import { DataFilter } from "../datafilter.js";
/**
* Provides the General HTML Support for custom elements (not registered in the {@link module:html-support/dataschema~DataSchema}).
*/
export declare class CustomElementSupport extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[DataFilter, DataSchema]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "CustomElementSupport";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
