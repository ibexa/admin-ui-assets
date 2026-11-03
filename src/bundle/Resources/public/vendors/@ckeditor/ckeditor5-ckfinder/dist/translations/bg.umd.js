/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: translations } = {"bg":{"dictionary":{"Insert image or file":"Вмъкни изображение или файл","Could not obtain resized image URL.":"Не може да бъде придобит промененият уеб адрес на изображението.","Selecting resized image failed":"Избирането на промененото изображение не е успешно","Could not insert image at the current position.":"На текущата позиция не може да се вмъкне изображение.","Inserting image failed":"Вмъкването на изображение не е успешно"}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bg' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
