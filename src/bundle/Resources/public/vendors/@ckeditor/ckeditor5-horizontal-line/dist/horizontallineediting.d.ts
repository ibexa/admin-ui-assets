/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module horizontal-line/horizontallineediting
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The horizontal line editing feature.
*/
export declare class HorizontalLineEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "HorizontalLineEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
