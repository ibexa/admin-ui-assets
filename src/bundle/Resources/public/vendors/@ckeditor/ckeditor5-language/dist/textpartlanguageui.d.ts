/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module language/textpartlanguageui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The text part language UI plugin.
*
* It introduces the `'language'` dropdown.
*/
export declare class TextPartLanguageUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TextPartLanguageUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Returns metadata for dropdown and menu items.
	*/
	private _getItemMetadata;
}
