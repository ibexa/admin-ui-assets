/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { WidgetResize } from "@ckeditor/ckeditor5-widget";
import { ImageUtils } from "../imageutils.js";
/**
* The image resize by handles feature.
*
* It adds the ability to resize each image using handles or manually by
* {@link module:image/imageresize/imageresizebuttons~ImageResizeButtons} buttons.
*/
export declare class ImageResizeHandles extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[WidgetResize, ImageUtils]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageResizeHandles";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Attaches the listeners responsible for creating a resizer for each image, except for images inside the HTML embed preview.
	*/
	private _setupResizerCreator;
}
