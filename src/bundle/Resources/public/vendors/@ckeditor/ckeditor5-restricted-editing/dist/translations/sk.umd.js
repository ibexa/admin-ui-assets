/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"Disable editing":"Deaktivovať úpravu","Enable editing":"Zapnúť režim úprav","Disable inline editing":"Zakázať vložené úpravy","Enable inline editing":"Povoliťvložené úpravy","Disable block editing":"Zakázať úpravu blokov","Enable block editing":"Povoliť úpravu blokov","Previous editable region":"Predchádzajúca oblasť úprav","Next editable region":"Nasledujúca oblasť úprav","Navigate editable regions":"Navigácia v oblasti úprav"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
