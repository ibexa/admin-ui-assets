/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Insert image or file":"Додај слику или фајл","Could not obtain resized image URL.":"УРЛ слика промењених димензија није доступна.","Selecting resized image failed":"Одабир слике промењених дименшија није успешно","Could not insert image at the current position.":"Немогуће је додати слику на ово место.","Inserting image failed":"Додавање слике је неуспешно"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
