/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Yellow marker":"Żółty marker","Green marker":"Zielony marker","Pink marker":"Różowy marker","Blue marker":"Niebieski marker","Red pen":"Czerwony długopis","Green pen":"Zielony długopis","Remove highlight":"Usuń podświetlenie","Highlight":"Podświetlenie","Text highlight toolbar":"Pasek narzędzi podświetleń"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
