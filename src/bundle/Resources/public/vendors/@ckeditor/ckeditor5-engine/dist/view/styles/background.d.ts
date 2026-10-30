/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import type { StylesProcessor } from "../stylesmap.js";
/**
* Adds background CSS styles processing rules to the given `StylesProcessor`.
*
* Registers normalizers for the `background` shorthand and its longhand properties,
* reducers that serialize them back to CSS strings, and the relation mapping between them.
*
* ```ts
* editor.data.addStyleProcessorRules( addBackgroundStylesRules );
* ```
*
* @param stylesProcessor The styles processor instance to register rules on.
*/
export declare function addBackgroundStylesRules(stylesProcessor: StylesProcessor): void;
