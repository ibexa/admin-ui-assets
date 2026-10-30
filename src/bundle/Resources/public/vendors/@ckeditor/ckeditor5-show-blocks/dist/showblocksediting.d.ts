/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module show-blocks/showblocksediting
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The show blocks editing plugin.
*/
export declare class ShowBlocksEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ShowBlocksEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
