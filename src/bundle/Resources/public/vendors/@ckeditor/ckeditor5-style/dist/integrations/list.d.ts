/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module style/integrations/list
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support";
import { StyleUtils } from "../styleutils.js";
export declare class ListStyleSupport extends Plugin {
	private _listUtils;
	private _styleUtils;
	private _htmlSupport;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "ListStyleSupport";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[StyleUtils, GeneralHtmlSupport]>;
	/**
	* @inheritDoc
	*/
	init(): void;
	/**
	* Verifies if the given style is applicable to the provided block element.
	*/
	private _isStyleEnabledForBlock;
	/**
	* Returns true if the given style is applied to the specified block element.
	*/
	private _isStyleActiveForBlock;
	/**
	* Returns an array of block elements that style should be applied to.
	*/
	private _getAffectedBlocks;
	/**
	* Returns a view template definition for the style preview.
	*/
	private _getStylePreview;
}
