/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module special-characters/specialcharactersessentials
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { SpecialCharactersCurrency } from "./specialcharacterscurrency.js";
import { SpecialCharactersMathematical } from "./specialcharactersmathematical.js";
import { SpecialCharactersArrows } from "./specialcharactersarrows.js";
import { SpecialCharactersLatin } from "./specialcharacterslatin.js";
import { SpecialCharactersText } from "./specialcharacterstext.js";
/**
* A plugin combining a basic set of characters for the special characters plugin.
*
* ```ts
* ClassicEditor
*   .create( {
*     plugins: [ ..., SpecialCharacters, SpecialCharactersEssentials ],
*   } )
*   .then( ... )
*   .catch( ... );
* ```
*/
export declare class SpecialCharactersEssentials extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "SpecialCharactersEssentials";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[SpecialCharactersCurrency, SpecialCharactersText, SpecialCharactersMathematical, SpecialCharactersArrows, SpecialCharactersLatin]>;
}
