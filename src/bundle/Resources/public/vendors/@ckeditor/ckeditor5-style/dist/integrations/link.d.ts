/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module style/integrations/link
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { GeneralHtmlSupport } from "@ckeditor/ckeditor5-html-support";
import { StyleUtils } from "../styleutils.js";
export declare class LinkStyleSupport extends Plugin {
	private _styleUtils;
	private _htmlSupport;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "LinkStyleSupport";
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
	* Verifies if the given style is applicable to the provided document selection.
	*/
	private _isStyleEnabled;
	/**
	* Returns true if the given style is applied to the specified document selection.
	*/
	private _isStyleActive;
	/**
	* Returns a selectable that given style should be applied to.
	*/
	private _getAffectedSelectable;
}
