/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module link/link
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { LinkEditing } from "./linkediting.js";
import { LinkUI } from "./linkui.js";
import { AutoLink } from "./autolink.js";
/**
* The link plugin.
*
* This is a "glue" plugin that loads the {@link module:link/linkediting~LinkEditing link editing feature}
* and {@link module:link/linkui~LinkUI link UI feature}.
*/
export declare class Link extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[LinkEditing, LinkUI, AutoLink]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "Link";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
