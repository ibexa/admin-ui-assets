/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { type Editor, Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ImageUtils } from "../imageutils.js";
/**
* The image resize editing feature.
*
* It adds the ability to resize each image using handles or manually by
* {@link module:image/imageresize/imageresizebuttons~ImageResizeButtons} buttons.
*/
export declare class ImageResizeEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageUtils]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageResizeEditing";
	/**
	* @inheritDoc
	* @internal
	*/
	static get licenseFeatureCode(): string;
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static override get isPremiumPlugin(): true;
	/**
	* @inheritDoc
	*/
	constructor(editor: Editor);
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* @inheritDoc
	*/
	afterInit(): void;
	private _registerSchema;
	/**
	* Registers image resize converters.
	*
	* @param imageType The type of the image.
	*/
	private _registerConverters;
}
