/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nl' ]: translations } = {"nl":{"dictionary":{"Disable editing":"Bewerken uitschakelen","Enable editing":"Bewerken inschakelen","Disable inline editing":"Inline-bewerking uitschakelen","Enable inline editing":"Inline-bewerking inschakelen","Disable block editing":"Blokbewerking uitschakelen","Enable block editing":"Blokbewerking inschakelen","Previous editable region":"Vorig bewerkbaar gebied","Next editable region":"Volgend bewerkbaar gebied","Navigate editable regions":"Navigeer bewerkbare gebieden"}}};
e[ 'nl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nl' ].dictionary = Object.assign( e[ 'nl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
