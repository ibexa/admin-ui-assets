/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Disable editing":"Onemogući uređivanje","Enable editing":"Омогући уређивање","Disable inline editing":"Onemogući direktno uređivanje","Enable inline editing":"Omogući direktno uređivanje","Disable block editing":"Onemogući uređivanje blokova","Enable block editing":"Omogući uređivanje blokova","Previous editable region":"Претходна регија за уређивање","Next editable region":"Следећа регија за уређивање","Navigate editable regions":"Пронђи регије за уређивање"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
