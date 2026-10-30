/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'el' ]: translations } = {"el":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"Εισαγωγή συμβόλου αλλαγής γραμμής χωρίς νέα παράγραφο (ένα στοιχείο <code>&lt;br&gt;</code>])","Insert a hard break (a new paragraph)":"Εισαγωγή συμβόλου αλλαγής γραμμής (με νέα παράγραφο)"}}};
e[ 'el' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'el' ].dictionary = Object.assign( e[ 'el' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'el' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
