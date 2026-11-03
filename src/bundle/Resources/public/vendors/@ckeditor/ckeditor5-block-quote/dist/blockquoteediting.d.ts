/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module block-quote/blockquoteediting
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Enter } from "@ckeditor/ckeditor5-enter";
import { Delete } from "@ckeditor/ckeditor5-typing";
/**
* The block quote editing.
*
* Introduces the `'blockQuote'` command and the `'blockQuote'` model element.
*
* @extends module:core/plugin~Plugin
*/
export declare class BlockQuoteEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "BlockQuoteEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[Enter, Delete]>;
	/**
	* @inheritDoc
	*/
	init(): void;
}
