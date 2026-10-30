/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: translations } = {"uz":{"dictionary":{"Disable editing":"","Enable editing":"Tahrirlashga ruxsat berish","Disable inline editing":"","Enable inline editing":"","Disable block editing":"","Enable block editing":"","Previous editable region":"Avvalgi tahrirlanadigan hudud","Next editable region":"Keyingi tahrirlanadigan hudud","Navigate editable regions":"Tahrirlanadigan hududlar boʻylab navigatsiya"}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uz' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
