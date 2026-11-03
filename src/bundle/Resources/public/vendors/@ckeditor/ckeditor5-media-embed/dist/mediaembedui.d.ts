/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module media-embed/mediaembedui
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Dialog } from "@ckeditor/ckeditor5-ui";
import { MediaEmbedEditing } from "./mediaembedediting.js";
/**
* The media embed UI plugin.
*/
export declare class MediaEmbedUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[MediaEmbedEditing, Dialog]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "MediaEmbedUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	private _formView;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Creates a button for menu bar that will show media embed dialog.
	*/
	private _createDialogButton;
	private _showDialog;
	private _handleSubmitForm;
}
