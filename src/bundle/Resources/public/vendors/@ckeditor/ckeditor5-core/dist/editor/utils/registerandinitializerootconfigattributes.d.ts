/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module core/editor/utils/registerandinitializerootconfigattributes
*/
import type { Editor } from "../editor.js";
/**
* Registers and initializes root attributes from the editor configuration:
*
* * the attributes from
* {@link module:core/editor/editorconfig~RootConfig#modelAttributes `config.root(s).<rootName>.modelAttributes`}, and
* * the {@link module:core/editor/editorconfig~RootConfig#description `description`} and
* {@link module:core/editor/editorconfig~RootConfig#title `title`} fields, stored as the `$description` and `$title`
* root attributes respectively.
*
* @internal
*/
export declare function registerAndInitializeRootConfigAttributes(editor: Editor): void;
