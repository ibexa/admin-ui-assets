/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Insert image or file":"Вставьте изображение или файл","Could not obtain resized image URL.":"Не удалось получить URL с измененным размером изображения.","Selecting resized image failed":"Выбор изображения с измененным размером не удался","Could not insert image at the current position.":"Нельзя вставить изображение на текущую позицию.","Inserting image failed":"Вставка изображения не удалась"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
