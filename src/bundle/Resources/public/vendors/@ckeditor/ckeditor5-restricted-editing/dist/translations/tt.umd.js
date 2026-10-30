/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tt' ]: translations } = {"tt":{"dictionary":{"Disable editing":"","Enable editing":"","Disable inline editing":"","Enable inline editing":"","Disable block editing":"","Enable block editing":"","Previous editable region":"","Next editable region":"","Navigate editable regions":""}}};
e[ 'tt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tt' ].dictionary = Object.assign( e[ 'tt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
