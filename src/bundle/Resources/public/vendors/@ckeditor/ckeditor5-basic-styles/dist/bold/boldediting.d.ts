/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module basic-styles/bold/boldediting
*/
import { Plugin } from "@ckeditor/ckeditor5-core";
/**
* The bold editing feature.
*
* It registers the `'bold'` command and introduces the `bold` attribute in the model which renders to the view
* as a `<strong>` element.
*/
export declare class BoldEditing extends Plugin {
	/**
	* @inheritDoc
	*/
	static get pluginName(): "BoldEditing";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	init(): void;
}
