/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module basic-styles/strikethrough/strikethroughui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The strikethrough UI feature. It introduces the Strikethrough button.
*/
export declare class StrikethroughUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "StrikethroughUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
