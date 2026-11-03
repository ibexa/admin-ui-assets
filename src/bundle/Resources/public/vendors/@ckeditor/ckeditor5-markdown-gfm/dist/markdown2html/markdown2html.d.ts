/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module markdown-gfm/markdown2html/markdown2html
*/
import { type Pluggable } from "unified";
/**
* The default `unified()` plugin chain used by {@link module:markdown-gfm/markdown2html/markdown2html~MarkdownGfmMdToHtml}.
* This object is frozen and must not be mutated. Pass a copy to the constructor if you need to customize the plugin chain.
*
* Learn more about the `unified()` plugin chain in the [unified](https://github.com/unifiedjs/unified) documentation.
*/
export declare const MarkdownGfmMdToHtmlDefaultPlugins: Readonly<Record<string, Pluggable>>;
/**
* This is a helper class used by the {@link module:markdown-gfm/markdown Markdown feature} to convert Markdown to HTML.
*/
export declare class MarkdownGfmMdToHtml {
	private _processor;
	/**
	* Creates a new instance of MarkdownGfmMdToHtml.
	* @param {Object} options - The options for the MarkdownGfmMdToHtml instance.
	* @param {Record<string, Pluggable>} options.plugins - The plugins to be used by the `unified().use()` processor for converting
	* Markdown to HTML. By default, {@link ~MarkdownGfmMdToHtmlDefaultPlugins} is used.
	* You can override the defaults by passing your own plugins.
	*
	* Learn more about the `unified()` plugin chain in the [unified](https://github.com/unifiedjs/unified) documentation.
	*/
	constructor({ plugins }?: {
		plugins?: Record<string, Pluggable>;
	});
	parse(markdown: string): string;
}
