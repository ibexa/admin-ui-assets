/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module restricted-editing/standardeditingmodeediting
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The standard editing mode editing feature.
*
* * It introduces the `restrictedEditingException` text attribute that is rendered as
* a `<span>` element with the `restricted-editing-exception` CSS class.
* * It registers the `'restrictedEditingException'` command.
*/
export declare class StandardEditingModeEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "StandardEditingModeEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
