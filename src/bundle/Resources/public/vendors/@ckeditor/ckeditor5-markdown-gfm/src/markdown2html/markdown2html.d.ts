/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * This is a helper class used by the {@link module:markdown-gfm/markdown Markdown feature} to convert Markdown to HTML.
 */
export declare class MarkdownToHtml {
    private _parser;
    private _options;
    constructor();
    parse(markdown: string): string;
}
