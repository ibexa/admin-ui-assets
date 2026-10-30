/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module heading/headingui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The headings UI feature. It introduces the `headings` dropdown.
*/
export declare class HeadingUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "HeadingUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
