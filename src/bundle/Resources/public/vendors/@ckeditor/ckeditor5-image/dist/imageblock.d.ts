/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imageblock
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Widget } from "@ckeditor/ckeditor5-widget";
import { ImageTextAlternative } from "./imagetextalternative.js";
import { ImageBlockEditing } from "./image/imageblockediting.js";
import { ImageInsertUI } from "./imageinsert/imageinsertui.js";
/**
* The image block plugin.
*
* This is a "glue" plugin which loads the following plugins:
*
* * {@link module:image/image/imageblockediting~ImageBlockEditing},
* * {@link module:image/imagetextalternative~ImageTextAlternative}.
*
* Usually, it is used in conjunction with other plugins from this package. See the {@glink api/image package page}
* for more information.
*/
export declare class ImageBlock extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageBlockEditing, Widget, ImageTextAlternative, ImageInsertUI]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageBlock";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
