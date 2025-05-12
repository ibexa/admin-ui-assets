/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
/**
 * @module document-outline/documentoutline/utils
 */
import { type Element } from 'ckeditor5/src/engine.js';
import { type Editor } from 'ckeditor5/src/core.js';
/**
 * Returns all text contents that are inside the given element and all its children.
 */
export declare function getElementText(element: Element): string;
/**
 * Returns a list of standard headings or GHS headings configured in the editor.
 */
export declare function getDefaultFeatureHeadingNames(editor: Editor): Array<string>;
