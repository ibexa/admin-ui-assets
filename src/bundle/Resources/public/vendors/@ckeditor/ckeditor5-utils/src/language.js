/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */
const RTL_LANGUAGE_CODES = [
    'ar', 'ara',
    'dv', 'div',
    'fa', 'per', 'fas',
    'he', 'heb',
    'ku', 'kur',
    'ug', 'uig',
    'ur', 'urd' // Urdu
];
/**
 * Helps determine whether a language text direction is LTR or RTL.
 *
 * @param languageCode The ISO 639-1 or ISO 639-2 language code.
 */
export function getLanguageDirection(languageCode) {
    return RTL_LANGUAGE_CODES.includes(languageCode) ? 'rtl' : 'ltr';
}
