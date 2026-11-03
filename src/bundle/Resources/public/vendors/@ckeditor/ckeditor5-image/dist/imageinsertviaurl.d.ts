/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imageinsertviaurl
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ImageInsertUI } from "./imageinsert/imageinsertui.js";
import { ImageInsertViaUrlUI } from "./imageinsert/imageinsertviaurlui.js";
/**
* The image insert via URL plugin.
*
* For a detailed overview, check the {@glink features/images/images-inserting
* Insert images via source URL} documentation.
*
* This plugin does not do anything directly, but it loads a set of specific plugins
* to enable image inserting via implemented integrations:
*
* * {@link module:image/imageinsert/imageinsertui~ImageInsertUI},
*/
export declare class ImageInsertViaUrl extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageInsertViaUrl";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageInsertViaUrlUI, ImageInsertUI]>;
}
