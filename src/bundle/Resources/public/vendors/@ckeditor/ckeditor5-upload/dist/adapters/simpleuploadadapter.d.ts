/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module upload/adapters/simpleuploadadapter
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { FileRepository } from "../filerepository.js";
/**
* The Simple upload adapter allows uploading images to an application running on your server using
* the [`XMLHttpRequest`](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) API with a
* minimal {@link module:upload/uploadconfig~SimpleUploadConfig editor configuration}.
*
* ```ts
* ClassicEditor
* 	.create( {
* 		simpleUpload: {
* 			uploadUrl: 'http://example.com',
* 			headers: {
* 				...
* 			}
* 		}
* 	} )
* 	.then( ... )
* 	.catch( ... );
* ```
*
* See the {@glink features/images/image-upload/simple-upload-adapter "Simple upload adapter"} guide to learn how to
* learn more about the feature (configuration, server–side requirements, etc.).
*
* Check out the {@glink features/images/image-upload/image-upload comprehensive "Image upload overview"} to learn about
* other ways to upload images into CKEditor 5.
*/
export declare class SimpleUploadAdapter extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[FileRepository]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "SimpleUploadAdapter";
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
	init(): void;
}
