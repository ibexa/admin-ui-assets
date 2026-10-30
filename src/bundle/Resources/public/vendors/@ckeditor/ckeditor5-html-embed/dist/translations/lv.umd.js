/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lv' ]: translations } = {"lv":{"dictionary":{"Insert HTML":"Ievietot HTML","HTML snippet":"HTML fragments","Paste raw HTML here...":"Ievietojiet HTML šeit...","Edit source":"Labot pirmavotu","Save changes":"Saglabāt izmaiņas","No preview available":"Priekšskatījums nav pieejams","Empty snippet content":"Tukšs fragments"}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
