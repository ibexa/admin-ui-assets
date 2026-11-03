/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/plaintableoutput
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Table } from "./table.js";
/**
* The plain table output feature.
*
* This feature strips the `<figure>` tag from the table data. This is because this tag is not supported
* by most popular email clients and removing it ensures compatibility.
*/
export declare class PlainTableOutput extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "PlainTableOutput";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[Table]>;
	/**
	* @inheritDoc
	*/
	init(): void;
}
