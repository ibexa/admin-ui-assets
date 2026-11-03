/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module special-characters/specialcharactersarrows
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* A plugin that provides special characters for the "Arrows" category.
*
* ```ts
* ClassicEditor
*   .create( {
*     plugins: [ ..., SpecialCharacters, SpecialCharactersArrows ],
*   } )
*   .then( ... )
*   .catch( ... );
* ```
*/
export declare class SpecialCharactersArrows extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "SpecialCharactersArrows";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
