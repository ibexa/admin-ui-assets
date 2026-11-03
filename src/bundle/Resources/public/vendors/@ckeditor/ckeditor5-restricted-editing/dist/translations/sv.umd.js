/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sv' ]: translations } = {"sv":{"dictionary":{"Disable editing":"Stäng av redigering","Enable editing":"Aktivera redigering","Disable inline editing":"Inaktivera direktredigering","Enable inline editing":"Aktivera direktredigering","Disable block editing":"Inaktivera blockredigering","Enable block editing":"Aktivera blockredigering","Previous editable region":"Föregående redigerbara område","Next editable region":"Nästa redigerbara område","Navigate editable regions":"Navigera redigerbara områden"}}};
e[ 'sv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sv' ].dictionary = Object.assign( e[ 'sv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
