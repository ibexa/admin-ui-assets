/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Unlink":"Видалити посилання","Link":"Посилання","Link URL":"URL посилання","Link URL must not be empty.":"URL-адреса посилання не може бути порожньою.","Link image":"Посилання зображення","Link properties":"Властивості посилання","Edit link":"Редагувати посилання","Open link in new tab":"Відкрити посилання у новій вкладці","Open in a new tab":"Вікрити у новій вкладці","Downloadable":"Завантажувальне","Create link":"Створити посилання","Move out of a link":"Вийти з посилання","Displayed text":"Відображений текст","No links available":"Немає доступних посилань","This link has no URL":"Ця посилання не має URL-адреси"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
