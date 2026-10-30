/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bs' ]: translations } = {"bs":{"dictionary":{"Find and replace":"Pronađi i zamijeni","Find in text…":"Pronađi u tekstu","Find":"Pronađi","Previous result":"Prethodni rezultat","Next result":"","Replace":"Zamijeni","Replace all":"Zamijeni sve","Match case":"Podudaranje","Whole words only":"Samo cijele riječi","Replace with…":"Zamijeni sa...","Text to find must not be empty.":"Unesite tekst za pretragu.","Tip: Find some text first in order to replace it.":"","Advanced options":"","Find in the document":""}}};
e[ 'bs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bs' ].dictionary = Object.assign( e[ 'bs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
