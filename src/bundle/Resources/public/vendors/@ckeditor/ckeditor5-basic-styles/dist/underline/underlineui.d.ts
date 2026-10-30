/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module basic-styles/underline/underlineui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The underline UI feature. It introduces the Underline button.
*/
export declare class UnderlineUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "UnderlineUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
