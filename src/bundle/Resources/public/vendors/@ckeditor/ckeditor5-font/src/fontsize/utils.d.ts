/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
import { type FontSizeOption } from '../fontconfig.js';
/**
 * Normalizes and translates the {@link module:font/fontconfig~FontSizeConfig#options configuration options}
 * to the {@link module:font/fontconfig~FontSizeOption} format.
 *
 * @param configuredOptions An array of options taken from the configuration.
 */
export declare function normalizeOptions(configuredOptions: Array<string | number | FontSizeOption>): Array<FontSizeOption>;
