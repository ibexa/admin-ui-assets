/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hr' ]: translations } = {"hr":{"dictionary":{"Find and replace":"Pronađi i zamijeni","Find in text…":"Pronađi u tekstu...","Find":"Pronađi","Previous result":"Prethodni rezultat","Next result":"Sljedeći rezultat","Replace":"Zamijeni","Replace all":"Zamijeni sve","Match case":"Točna velika/mala slova","Whole words only":"Samo cijele riječi","Replace with…":"Zamijeni sa....","Text to find must not be empty.":"Morate upisati tekst za traženje.","Tip: Find some text first in order to replace it.":"Savjet: Pronađite neki tekst kako bi ga zamijenili.","Advanced options":"","Find in the document":""}}};
e[ 'hr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hr' ].dictionary = Object.assign( e[ 'hr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
