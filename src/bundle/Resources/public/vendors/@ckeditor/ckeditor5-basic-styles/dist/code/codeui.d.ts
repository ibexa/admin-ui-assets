/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module basic-styles/code/codeui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The code UI feature. It introduces the Code button.
*/
export declare class CodeUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "CodeUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
