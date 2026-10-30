/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"Insert code block":"Vložte blok kódu","Plain text":"Čistý text","Leaving %0 code snippet":"Opúšťanie %0 útržku kódu","Entering %0 code snippet":"Zadávanie %0 útržku kódu","Entering code snippet":"Zadávanie útržku kódu","Leaving code snippet":"Opúšťanie útržku kódu","Code block":"Blok kódu"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
