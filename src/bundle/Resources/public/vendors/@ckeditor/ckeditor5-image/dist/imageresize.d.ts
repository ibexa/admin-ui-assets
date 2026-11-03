/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imageresize
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ImageResizeButtons } from "./imageresize/imageresizebuttons.js";
import { ImageResizeEditing } from "./imageresize/imageresizeediting.js";
import { ImageResizeHandles } from "./imageresize/imageresizehandles.js";
import { ImageCustomResizeUI } from "./imageresize/imagecustomresizeui.js";
/**
* The image resize plugin.
*
* It adds a possibility to resize each image using handles.
*/
export declare class ImageResize extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageResizeEditing, ImageResizeHandles, ImageCustomResizeUI, ImageResizeButtons]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageResize";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
