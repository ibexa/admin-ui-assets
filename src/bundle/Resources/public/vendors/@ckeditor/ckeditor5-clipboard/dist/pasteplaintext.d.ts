/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module clipboard/pasteplaintext
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { ClipboardPipeline } from "./clipboardpipeline.js";
/**
* The plugin detects the user's intention to paste plain text.
*
* For example, it detects the <kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>V</kbd> keystroke.
*/
export declare class PastePlainText extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "PastePlainText";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[ClipboardPipeline]>;
	/**
	* @inheritDoc
	*/
	init(): void;
}
