/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: translations } = {"bg":{"dictionary":{"Unlink":"Премахване на линка","Link":"Линк","Link URL":"Уеб адрес на линка","Link URL must not be empty.":"URL препратката не трябва да е празна.","Link image":"Свържи изображение","Link properties":"Свойства на връзката","Edit link":"Редакция на линк","Open link in new tab":"Отваряне на линк в нов раздел","Open in a new tab":"Отваряне в нов раздел","Downloadable":"Изтегляне","Create link":"Създаване на линк","Move out of a link":"Излизане от линк","Displayed text":"Показан текст","No links available":"Няма налични връзки","This link has no URL":"Тази връзка няма URL адрес"}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bg' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
