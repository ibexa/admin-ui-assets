/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
/**
* @module core/editor/utils/normalizerootsconfig
*/
import type { EditorConfig, ViewRootElementDefinition } from "../editorconfig.js";
import { type Config } from "@ckeditor/ckeditor5-utils";
/**
* Normalizes the editor roots configuration. It ensures that all root configurations are defined in `config.roots`
* and that they have `initialData` defined.
*
* It normalizes a single-root configuration (where `config.root` is used) to a multi-root configuration
* (where all roots are defined in `config.roots`). This is considered a standard configuration format,
* so the editor features can always expect roots to be defined in `config.roots`.
*
* It also handles legacy configuration options, such as `config.initialData`, `config.placeholder`, and `config.label`.
*
* @internal
*/
export declare function normalizeRootsConfig(sourceElementsOrData: HTMLElement | string | Record<string, HTMLElement> | Record<string, string>, config: Config<EditorConfig>, defaultRootName?: string | false, separateAttachTo?: boolean): void;
/**
* Normalizes the parameters passed to the editor constructor when a single root is used. It supports both of the following signatures:
*
* ```ts
* new Editor( editorConfig: EditorConfig );
* new Editor( sourceElementOrData: HTMLElement | string, editorConfig: EditorConfig );
* ```
*
* @internal
*/
export declare function normalizeSingleRootEditorConstructorParams(sourceElementOrDataOrConfig: HTMLElement | string | EditorConfig, editorConfig: EditorConfig): {
	sourceElementOrData: HTMLElement | string;
	editorConfig: EditorConfig;
};
/**
* Normalizes the parameters passed to the editor constructor when a multi root is used. It supports both of the following signatures:
*
* ```ts
* new Editor( editorConfig: EditorConfig );
* new Editor( sourceElementsOrData: Record<string, string> | Record<string, HTMLElement>, editorConfig: EditorConfig );
* ```
*
* @internal
*/
export declare function normalizeMultiRootEditorConstructorParams(sourceElementOrDataOrConfig: Record<string, string> | Record<string, HTMLElement>, editorConfig: EditorConfig): {
	sourceElementsOrData: Record<string, string> | Record<string, HTMLElement>;
	editorConfig: EditorConfig;
};
/**
* Normalizes the value passed in {@link module:core/editor/editorconfig~RootConfig#element `config.root.element`} into a
* canonical form (`HTMLElement` or {@link module:core/editor/editorconfig~ViewRootElementDefinition}) that the UI layer
* can consume directly.
*
* Accepts:
*
* * an existing `HTMLElement` - returned as is, so the editor wraps it in place,
* * a tag name string (e.g. `'h1'`) - turned into `{ name: 'h1' }`,
* * a {@link module:core/editor/editorconfig~ViewRootElementDefinition} object - reshaped so `classes` becomes an
* array and `attributes.class` is lifted into it.
*
* The `class` attribute may be passed either as the dedicated `classes` field (string or array of strings) or as a
* `class` key inside `attributes`. They are concatenated. The `style` attribute may be passed either as the `styles`
* object or as a `style` string inside `attributes`. When both are provided, the object form takes precedence and a
* warning is logged.
*
* The `<textarea>` tag name is rejected as it cannot host a rich-text editable.
*
* Already used internally by {@link ~normalizeRootsConfig `normalizeRootsConfig()`} for `config.root.element` /
* `config.roots.*.element`. Exported for callers that bypass the regular config-normalization pass, e.g.
* {@link module:editor-multi-root/multirooteditor~MultiRootEditor#addRoot `MultiRootEditor.addRoot()`}
* and {@link module:editor-multi-root/multirooteditor~MultiRootEditor#createEditable `MultiRootEditor.createEditable()`}.
*
* @internal
*/
export declare function normalizeViewRootElementDefinition(spec: HTMLElement | string | ViewRootElementDefinition | undefined): HTMLElement | ViewRootElementDefinition | undefined;
