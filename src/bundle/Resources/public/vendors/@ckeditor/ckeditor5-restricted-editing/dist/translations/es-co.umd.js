/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es-co' ]: translations } = {"es-co":{"dictionary":{"Disable editing":"","Enable editing":"","Disable inline editing":"","Enable inline editing":"","Disable block editing":"","Enable block editing":"","Previous editable region":"","Next editable region":"","Navigate editable regions":""}}};
e[ 'es-co' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es-co' ].dictionary = Object.assign( e[ 'es-co' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es-co' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
