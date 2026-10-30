/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Yellow marker":"Жути маркер","Green marker":"Зелени маркер","Pink marker":"Роза маркер","Blue marker":"Плави маркер","Red pen":"Црвена оловка","Green pen":"Зелена оловка","Remove highlight":"Уклони истицање","Highlight":"Истицање","Text highlight toolbar":"Алатке за маркирање текста"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
