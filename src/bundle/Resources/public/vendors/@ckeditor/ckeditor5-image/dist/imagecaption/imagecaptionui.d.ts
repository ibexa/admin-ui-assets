/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imagecaption/imagecaptionui
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ImageCaptionUtils } from "./imagecaptionutils.js";
/**
* The image caption UI plugin. It introduces the `'toggleImageCaption'` UI button.
*/
export declare class ImageCaptionUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageCaptionUtils]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageCaptionUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
