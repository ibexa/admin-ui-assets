/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lt' ]: translations } = {"lt":{"dictionary":{"Find and replace":"Rasti ir pakeisti","Find in text…":"Surasti tekste...","Find":"Surasti","Previous result":"Buvęs rezultatas","Next result":"Kitas rezultatas","Replace":"Pakeisti","Replace all":"Pakeisti visus","Match case":"Sutapties atvejis","Whole words only":"Tik vientisus žodžius","Replace with…":"Sukeisti su...","Text to find must not be empty.":"Ieškomas tekstas negali būti tuščias.","Tip: Find some text first in order to replace it.":"Patarimas: Pirmiausiai suraskite teksto, jog jį sukeistumėte.","Advanced options":"Išplėstinės pasirinktys","Find in the document":"Ieškoti dokumente"}}};
e[ 'lt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lt' ].dictionary = Object.assign( e[ 'lt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
