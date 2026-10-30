/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Insert code block":"Wstaw blok kodu","Plain text":"Zwykły tekst","Leaving %0 code snippet":"Opuszczenie fragmentu kodu %0","Entering %0 code snippet":"Wchodzenie we fragment kodu %0","Entering code snippet":"Wchodzenie we fragment kodu","Leaving code snippet":"Opuszczanie fragmentu kodu","Code block":"Blok kodu"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
