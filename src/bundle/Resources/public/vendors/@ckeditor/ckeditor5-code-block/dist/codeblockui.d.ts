/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module code-block/codeblockui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The code block UI plugin.
*
* Introduces the `'codeBlock'` dropdown.
*/
export declare class CodeBlockUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "CodeBlockUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* A helper returning a collection of the `codeBlock` dropdown items representing languages
	* available for the user to choose from.
	*/
	private _getLanguageListItemDefinitions;
}
