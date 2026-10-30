/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tk' ]: translations } = {"tk":{"dictionary":{"Disable editing":"","Enable editing":"Redaktirlemegi işjeňleşdiriň","Disable inline editing":"","Enable inline editing":"","Disable block editing":"","Enable block editing":"","Previous editable region":"Öňki redaktirläp bolýan sebit","Next editable region":"Indiki redaktirläp bolýan sebit","Navigate editable regions":"Düzedip bolýan sebitlere geçiň"}}};
e[ 'tk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tk' ].dictionary = Object.assign( e[ 'tk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
