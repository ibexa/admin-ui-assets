/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module basic-styles/bold/boldui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The bold UI feature. It introduces the Bold button.
*/
export declare class BoldUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "BoldUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
