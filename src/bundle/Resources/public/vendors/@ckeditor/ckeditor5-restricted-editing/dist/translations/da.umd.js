/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'da' ]: translations } = {"da":{"dictionary":{"Disable editing":"Deaktiver redigering","Enable editing":"Aktivér redigering","Disable inline editing":"Deaktiver inline redigering","Enable inline editing":"Aktiver inline redigering","Disable block editing":"Deaktiver blokredigering","Enable block editing":"Aktiver blokredigering","Previous editable region":"Forrige redigérbare region","Next editable region":"Næste redigérbare region","Navigate editable regions":"Gennemgå redigérbare regioner"}}};
e[ 'da' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'da' ].dictionary = Object.assign( e[ 'da' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'da' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
