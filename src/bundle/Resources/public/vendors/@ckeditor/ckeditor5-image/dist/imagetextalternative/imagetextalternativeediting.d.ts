/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module image/imagetextalternative/imagetextalternativeediting
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ImageUtils } from "../imageutils.js";
/**
* The image text alternative editing plugin.
*
* Registers the `'imageTextAlternative'` command.
*/
export declare class ImageTextAlternativeEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ImageUtils]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ImageTextAlternativeEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
