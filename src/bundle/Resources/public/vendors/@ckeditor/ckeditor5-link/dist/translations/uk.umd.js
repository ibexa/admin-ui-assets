/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: { dictionary, getPluralForm } } = {"uk":{"dictionary":{"Unlink":"Видалити посилання","Link":"Посилання","Link URL":"URL посилання","Link URL must not be empty.":"URL-адреса посилання не може бути порожньою.","Link image":"Посилання зображення","Edit link":"Редагувати посилання","Open link in new tab":"Відкрити посилання у новій вкладці","Open in a new tab":"Вікрити у новій вкладці","Downloadable":"Завантажувальне","Create link":"Створити посилання","Move out of a link":"Вийти з посилання","Link properties":"Властивості посилання","Displayed text":"Відображений текст","No links available":"Немає доступних посилань"},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, dictionary );
e[ 'uk' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
