/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module style/styleui
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { StyleUtils } from "./styleutils.js";
/**
* The UI plugin of the style feature .
*
* It registers the `'style'` UI dropdown in the editor's {@link module:ui/componentfactory~ComponentFactory component factory}
* that displays a grid of styles and allows changing styles of the content.
*/
export declare class StyleUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "StyleUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[StyleUtils]>;
	/**
	* @inheritDoc
	*/
	init(): void;
}
