/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: translations } = {"cs":{"dictionary":{"Insert code block":"Vložit blok zdrojového kódu","Plain text":"Prostý text","Leaving %0 code snippet":"Opouští se fragment kódu %0","Entering %0 code snippet":"Zadávání fragmentu kódu %0","Entering code snippet":"Zadávání fragmentu kódu","Leaving code snippet":"Opuštění fragmentu kódu","Code block":"Blok kódu"}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'cs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
