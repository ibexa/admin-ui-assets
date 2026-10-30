/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: translations } = {"ro":{"dictionary":{"Disable editing":"Dezactivați editarea","Enable editing":"Activează editarea","Disable inline editing":"Dezactivați editarea inline (în interiorul textului)","Enable inline editing":"Activați editarea inline (în interiorul textului)","Disable block editing":"Dezactivați editarea blocurilor","Enable block editing":"Activați editarea blocurilor","Previous editable region":"Regiunea editabilă precedentă","Next editable region":"Regiunea editabilă următoare","Navigate editable regions":"Navighează la regiunile editabile"}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ro' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
