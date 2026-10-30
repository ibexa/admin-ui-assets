/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module ckbox/ckboxuploadadapter
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { FileRepository } from "@ckeditor/ckeditor5-upload";
import { ImageUploadEditing, ImageUploadProgress } from "@ckeditor/ckeditor5-image";
import { CKBoxEditing } from "./ckboxediting.js";
/**
* A plugin that enables file uploads in CKEditor 5 using the CKBox server–side connector.
* See the {@glink features/file-management/ckbox CKBox file manager integration} guide to learn how to configure
* and use this feature as well as find out more about the full integration with the file manager
* provided by the {@link module:ckbox/ckbox~CKBox} plugin.
*
* Check out the {@glink features/images/image-upload/image-upload Image upload overview} guide to learn about
* other ways to upload images into CKEditor 5.
*/
export declare class CKBoxUploadAdapter extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageUploadEditing, ImageUploadProgress, FileRepository, CKBoxEditing]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "CKBoxUploadAdapter";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	afterInit(): Promise<void>;
}
