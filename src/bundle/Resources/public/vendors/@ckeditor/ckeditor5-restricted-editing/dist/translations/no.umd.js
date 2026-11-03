/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'no' ]: translations } = {"no":{"dictionary":{"Disable editing":"Deaktiver redigering","Enable editing":"Aktivere redigering","Disable inline editing":"Deaktiver innebygd redigering","Enable inline editing":"Aktiver innebygd redigering","Disable block editing":"Deaktiver blokkredigering","Enable block editing":"Aktiver blokkredigering","Previous editable region":"Forrige redigerbare region","Next editable region":"Neste redigerbare region","Navigate editable regions":"Naviger redigerbare regioner"}}};
e[ 'no' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'no' ].dictionary = Object.assign( e[ 'no' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'no' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
