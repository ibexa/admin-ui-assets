/**
* @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
* For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
*/
import type { MediaStyleDropdownDefinition, NormalizedMediaStyleOption } from "../mediaembedconfig.js";
/**
* Built-in style options provided by the plugin. Integrators can refer to these by
* name in {@link module:media-embed/mediaembedconfig~MediaEmbedConfig#styles `config.mediaEmbed.styles`}
* to opt out, override individual fields, or coexist with custom styles.
*
* @internal
*/
export declare const DEFAULT_OPTIONS: Record<string, NormalizedMediaStyleOption>;
/**
* Short icon-name aliases that can be used as the `icon` value in a media style
* option definition. Matches the alias set exposed by the image styles feature so
* the two APIs feel symmetrical.
*
* @internal
*/
export declare const DEFAULT_ICONS: Record<string, string>;
/**
* Built-in dropdown groupings. Each entry references built-in style component names. If any
* items are filtered out by configuration, the dropdown is rebuilt from the remaining names
* (or skipped entirely if fewer than two remain).
*
* @internal
*/
export declare const DEFAULT_DROPDOWN_DEFINITIONS: Array<MediaStyleDropdownDefinition>;
