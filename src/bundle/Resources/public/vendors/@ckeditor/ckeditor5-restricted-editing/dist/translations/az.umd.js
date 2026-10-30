/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'az' ]: translations } = {"az":{"dictionary":{"Disable editing":"","Enable editing":"","Disable inline editing":"","Enable inline editing":"","Disable block editing":"","Enable block editing":"","Previous editable region":"Əvvəlki düzəliş olunan bölgə","Next editable region":"Sonrakı düzəliş olunan bölgə","Navigate editable regions":""}}};
e[ 'az' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'az' ].dictionary = Object.assign( e[ 'az' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'az' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
