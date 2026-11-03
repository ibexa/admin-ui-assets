/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module style/style
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { StyleUI } from "./styleui.js";
import { StyleEditing } from "./styleediting.js";
/**
* The style plugin.
*
* This is a "glue" plugin that loads the {@link module:style/styleediting~StyleEditing style editing feature}
* and {@link module:style/styleui~StyleUI style UI feature}.
*/
export declare class Style extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "Style";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[StyleEditing, StyleUI]>;
}
