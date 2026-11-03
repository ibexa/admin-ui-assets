/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module basic-styles/italic
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ItalicEditing } from "./italic/italicediting.js";
import { ItalicUI } from "./italic/italicui.js";
/**
* The italic feature.
*
* For a detailed overview check the {@glink features/basic-styles Basic styles feature} guide
* and the {@glink api/basic-styles package page}.
*
* This is a "glue" plugin which loads the {@link module:basic-styles/italic/italicediting~ItalicEditing} and
* {@link module:basic-styles/italic/italicui~ItalicUI} plugins.
*/
export declare class Italic extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ItalicEditing, ItalicUI]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "Italic";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
