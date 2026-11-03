/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/image/imageplaceholder
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ImageUtils } from "../imageutils.js";
/**
* Adds support for image placeholder that is automatically removed when the image is loaded.
*/
export declare class ImagePlaceholder extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageUtils]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImagePlaceholder";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	afterInit(): void;
	/**
	* Extends model schema.
	*/
	private _setupSchema;
	/**
	* Registers converters.
	*/
	private _setupConversion;
	/**
	* Prepares listener for image load.
	*/
	private _setupLoadListener;
}
