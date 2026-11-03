/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'da' ]: translations } = {"da":{"dictionary":{"Find and replace":"Søg og erstat","Find in text…":"Find i tekst...","Find":"Find","Previous result":"Forrige","Next result":"Næste","Replace":"Erstat","Replace all":"Erstatte alle","Match case":"Skeln mellem store og små bogstaver","Whole words only":"Kun hele ord","Replace with…":"Erstat med...","Text to find must not be empty.":"Tekst der skal findes, må ikke være tom.","Tip: Find some text first in order to replace it.":"Tip: Find først noget tekst, for at erstatte det.","Advanced options":"Avancerede indstillinger","Find in the document":"Find i dokumentet"}}};
e[ 'da' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'da' ].dictionary = Object.assign( e[ 'da' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'da' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
