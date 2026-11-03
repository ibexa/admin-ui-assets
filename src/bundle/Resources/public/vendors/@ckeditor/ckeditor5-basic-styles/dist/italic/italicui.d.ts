/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module basic-styles/italic/italicui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The italic UI feature. It introduces the Italic button.
*/
export declare class ItalicUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ItalicUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
