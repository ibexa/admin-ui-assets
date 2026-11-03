/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedresize/mediaembedresizebuttons
*/
import { Plugin, type Editor, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { MediaEmbedResizeEditing } from "./mediaembedresizeediting.js";
/**
* The media embed resize buttons plugin.
*
* It adds a possibility to resize media embeds using the toolbar dropdown or individual buttons,
* depending on the plugin configuration.
*/
export declare class MediaEmbedResizeButtons extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[MediaEmbedResizeEditing]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "MediaEmbedResizeButtons";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	private readonly _resizeUnit;
	/**
	* @inheritDoc
	*/
	constructor(editor: Editor);
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Creates a standalone button component for the given resize option.
	*/
	private _registerMediaEmbedResizeButton;
	/**
	* Creates the dropdown component containing all resize options.
	*/
	private _registerMediaEmbedResizeDropdown;
	/**
	* Returns a label for the given resize option.
	*/
	private _getOptionLabelValue;
	/**
	* Returns list item definitions for the resize dropdown.
	*/
	private _getResizeDropdownListItemDefinitions;
}
