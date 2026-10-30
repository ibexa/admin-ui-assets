/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import type { EditorConfig } from "@ckeditor/ckeditor5-core";
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
export declare function normalizeRootsConfig(sourceElementsOrData: HTMLElement | string | Record<string, HTMLElement> | Record<string, string>, config: EditorConfig, defaultRootName: string | false): void;
