/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: { dictionary, getPluralForm } } = {"ru":{"dictionary":{"Bold":"Жирный","Italic":"Курсив","Underline":"Подчеркнутый","Code":"Исходный код","Strikethrough":"Зачеркнутый","Subscript":"Подстрочный","Superscript":"Надстрочный","Italic text":"Текст курсивом","Move out of an inline code style":"Выйти из встроенного стиля кода","Bold text":"Жирный текст","Underline text":"Подчеркнутый текст","Strikethrough text":"Зачеркнутый текст"},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, dictionary );
e[ 'ru' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
