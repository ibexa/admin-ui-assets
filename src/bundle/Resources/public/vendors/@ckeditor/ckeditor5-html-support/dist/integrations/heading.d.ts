/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module html-support/integrations/heading
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Enter } from "@ckeditor/ckeditor5-enter";
import { DataSchema } from "../dataschema.js";
/**
* Provides the General HTML Support integration with {@link module:heading/heading~Heading Heading} feature.
*/
export declare class HeadingElementSupport extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[DataSchema, Enter]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "HeadingElementSupport";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Registers all elements supported by HeadingEditing to enable custom attributes for those elements.
	*/
	private registerHeadingElements;
}
