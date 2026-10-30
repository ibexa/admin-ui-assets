/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imagecaption
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ImageCaptionEditing } from "./imagecaption/imagecaptionediting.js";
import { ImageCaptionUI } from "./imagecaption/imagecaptionui.js";
/**
* The image caption plugin.
*
* For a detailed overview, check the {@glink features/images/images-captions image caption} documentation.
*/
export declare class ImageCaption extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageCaptionEditing, ImageCaptionUI]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageCaption";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
