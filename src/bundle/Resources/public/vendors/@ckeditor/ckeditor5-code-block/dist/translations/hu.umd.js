/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hu' ]: translations } = {"hu":{"dictionary":{"Insert code block":"Kód blokk beszúrása","Plain text":"Egyszerű szöveg","Leaving %0 code snippet":"%0 kódrészlet elhagyása","Entering %0 code snippet":"%0 kódrészlet bevitele","Entering code snippet":"Kódrészlet bevitele","Leaving code snippet":"Kódrészlet elhagyása","Code block":"Kódblokk"}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
