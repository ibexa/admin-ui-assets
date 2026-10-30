/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr-latn' ]: translations } = {"sr-latn":{"dictionary":{"Find and replace":"Nađji i zameni","Find in text…":"Pronađji u tekstu…","Find":"Pronađji","Previous result":"Prethodni rezultat","Next result":"Sledeći rezultat","Replace":"Zameni","Replace all":"Zameni sve","Match case":"Podudaranje slučaj","Whole words only":"Samo cele reči","Replace with…":"Zameni sa…","Text to find must not be empty.":"Tekst za pronalaženje ne sme biti prazan.","Tip: Find some text first in order to replace it.":"Savet: Prvo pronađjite neki tekst da biste ga zamenili.","Advanced options":"Napredne opcije","Find in the document":"Pronađite u dokumentu"}}};
e[ 'sr-latn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr-latn' ].dictionary = Object.assign( e[ 'sr-latn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr-latn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
