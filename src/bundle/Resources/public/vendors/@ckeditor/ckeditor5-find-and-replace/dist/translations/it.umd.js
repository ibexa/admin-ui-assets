/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'it' ]: translations } = {"it":{"dictionary":{"Find and replace":"Trova e sostituisci","Find in text…":"Trova nel testo…","Find":"Trova","Previous result":"Risultato precedente","Next result":"Risultato successivo","Replace":"Sostituisci","Replace all":"Sostituisci tutto","Match case":"Distingui maiuscole e minuscole","Whole words only":"Solo parole intere","Replace with…":"Sostituisci con…","Text to find must not be empty.":"Il testo da cercare non può essere vuoto.","Tip: Find some text first in order to replace it.":"Consiglio: trova il testo prima di sostituirlo.","Advanced options":"Opzioni avanzate","Find in the document":"Trova nel documento"}}};
e[ 'it' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'it' ].dictionary = Object.assign( e[ 'it' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'it' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
