/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module table/tablecaption/tablecaptionui
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The table caption UI plugin. It introduces the `'toggleTableCaption'` UI button.
*/
export declare class TableCaptionUI extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "TableCaptionUI";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
