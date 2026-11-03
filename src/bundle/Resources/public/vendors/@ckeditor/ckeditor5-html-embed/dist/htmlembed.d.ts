/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module html-embed/htmlembed
*/
import { Plugin, type PluginDependenciesOf } from "@ckeditor/ckeditor5-core";
import { Widget } from "@ckeditor/ckeditor5-widget";
import { HtmlEmbedEditing } from "./htmlembedediting.js";
import { HtmlEmbedUI } from "./htmlembedui.js";
/**
* The HTML embed feature.
*
* It allows inserting HTML snippets directly into the editor.
*
* For a detailed overview, check the {@glink features/html/html-embed HTML embed feature} documentation.
*/
export declare class HtmlEmbed extends Plugin {
	/**
	* @inheritDoc
	*/
	static get requires(): PluginDependenciesOf<[HtmlEmbedEditing, HtmlEmbedUI, Widget]>;
	/**
	* @inheritDoc
	*/
	static get pluginName(): "HtmlEmbed";
	/**
	* @inheritDoc
	*/
	static override get isOfficialPlugin(): true;
}
