/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Insert code block":"Додај блок кода","Plain text":"Обичан текст","Leaving %0 code snippet":"Ostavljanje %0 isečka koda","Entering %0 code snippet":"Unošenje %0 isečka koda","Entering code snippet":"Unošenje isečka koda","Leaving code snippet":"Ostavljanje isečka koda","Code block":"Blok koda"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
