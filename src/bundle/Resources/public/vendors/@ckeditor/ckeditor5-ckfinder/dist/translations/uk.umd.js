/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Insert image or file":"Вставте зображення або файл","Could not obtain resized image URL.":"Не вдалось отримати URL зміненого зображення.","Selecting resized image failed":"Не вдалося вибрати зображення зі зміненим розміром","Could not insert image at the current position.":"Не можливо вставити зображення в поточну позицію.","Inserting image failed":"Не вдалось вставити зображення"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
