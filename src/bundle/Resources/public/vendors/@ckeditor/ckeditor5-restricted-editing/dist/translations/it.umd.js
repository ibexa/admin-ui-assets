/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'it' ]: translations } = {"it":{"dictionary":{"Disable editing":"Disabilita la modifica","Enable editing":"Abilita modifica","Disable inline editing":"Disabilita modifica lineare","Enable inline editing":"Abilita modifica lineare","Disable block editing":"Disabilita modifica blocchi","Enable block editing":"Abilita modifica blocchi","Previous editable region":"Regione modificabile precedente","Next editable region":"Regione modificabile successiva","Navigate editable regions":"Spostati tra regioni modificabili"}}};
e[ 'it' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'it' ].dictionary = Object.assign( e[ 'it' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'it' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
