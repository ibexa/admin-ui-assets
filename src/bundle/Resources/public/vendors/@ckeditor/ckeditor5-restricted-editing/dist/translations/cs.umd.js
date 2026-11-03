/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: translations } = {"cs":{"dictionary":{"Disable editing":"Zakázat úpravy","Enable editing":"Povolit úpravy","Disable inline editing":"Zakázat úpravy v textu","Enable inline editing":"Povolit inline úpravy","Disable block editing":"Zakázat blokové úpravy","Enable block editing":"Povolit blokové úpravy","Previous editable region":"Předchozí upravitelná oblast","Next editable region":"Následující upravitelná oblast","Navigate editable regions":"Procházet upravitelnými oblastmi"}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'cs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
