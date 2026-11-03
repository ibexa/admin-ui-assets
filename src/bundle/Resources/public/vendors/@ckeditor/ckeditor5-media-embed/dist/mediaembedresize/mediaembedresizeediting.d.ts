/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import { Plugin, type Editor, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { MediaEmbedEditing } from "../mediaembedediting.js";
/**
* The media embed resize editing feature.
*
* It adds the ability to resize each media embed using handles.
*/
export declare class MediaEmbedResizeEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[MediaEmbedEditing]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "MediaEmbedResizeEditing";
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
	* Registers media embed resize converters.
	*/
	private _registerConverters;
}
