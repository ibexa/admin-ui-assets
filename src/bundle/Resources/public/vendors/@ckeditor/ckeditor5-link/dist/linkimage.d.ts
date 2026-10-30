/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/linkimage
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { LinkImageEditing } from "./linkimageediting.js";
import { LinkImageUI } from "./linkimageui.js";
/**
* The `LinkImage` plugin.
*
* This is a "glue" plugin that loads the {@link module:link/linkimageediting~LinkImageEditing link image editing feature}
* and {@link module:link/linkimageui~LinkImageUI link image UI feature}.
*/
export declare class LinkImage extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[LinkImageEditing, LinkImageUI]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "LinkImage";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
