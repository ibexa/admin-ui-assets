/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'el' ]: { dictionary, getPluralForm } } = {"el":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"Εισαγωγή συμβόλου αλλαγής γραμμής χωρίς νέα παράγραφο (ένα στοιχείο <code>&lt;br&gt;</code>])","Insert a hard break (a new paragraph)":"Εισαγωγή συμβόλου αλλαγής γραμμής (με νέα παράγραφο)"},getPluralForm(n){return (n != 1);}}};
e[ 'el' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'el' ].dictionary = Object.assign( e[ 'el' ].dictionary, dictionary );
e[ 'el' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
