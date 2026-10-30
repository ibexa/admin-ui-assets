/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import type { ToolbarConfigItem } from "@ckeditor/ckeditor5-core";
import type { MediaStyleConfig, MediaStyleDropdownDefinition, NormalizedMediaStyleOption } from "../mediaembedconfig.js";
/**
* Normalizes the {@link module:media-embed/mediaembedconfig~MediaStyleConfig#options style options}
* provided by the integrator. Each entry is resolved into a full
* {@link module:media-embed/mediaembedconfig~MediaStyleOptionDefinition} and invalid entries
* are filtered out with a console warning.
*
* @internal
*/
export declare function normalizeStyles(configuredStyles: MediaStyleConfig): Array<NormalizedMediaStyleOption>;
/**
* Type guard for toolbar config entries shaped like a media style dropdown definition. The
* discriminator is `defaultItem` — generic toolbar groupings use `items` + `label` and never
* carry a `defaultItem` field.
*
* @internal
*/
export declare function isMediaStyleDropdown(item: ToolbarConfigItem | MediaStyleDropdownDefinition): item is MediaStyleDropdownDefinition;
