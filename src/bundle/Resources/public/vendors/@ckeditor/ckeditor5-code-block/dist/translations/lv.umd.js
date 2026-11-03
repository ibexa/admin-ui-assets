/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lv' ]: translations } = {"lv":{"dictionary":{"Insert code block":"Ievietot koda bloku","Plain text":"Vienkāršs teksts","Leaving %0 code snippet":"Tiek atstāts %0 koda fragments","Entering %0 code snippet":"%0 koda fragmenta ievade","Entering code snippet":"Koda fragmenta ievade","Leaving code snippet":"Atstāj koda fragmentu","Code block":"Koda bloks"}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
