/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module fullscreen/fullscreenui
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { FullscreenEditing } from "./fullscreenediting.js";
/**
* A plugin registering the fullscreen mode buttons.
*/
export declare class FullscreenUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[FullscreenEditing]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "FullscreenUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Creates a button that toggles the fullscreen mode.
	*/
	private _createButton;
}
