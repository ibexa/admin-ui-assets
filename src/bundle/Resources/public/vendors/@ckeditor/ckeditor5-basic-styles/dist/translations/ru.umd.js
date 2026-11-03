/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Bold":"Жирный","Italic":"Курсив","Underline":"Подчеркнутый","Code":"Исходный код","Strikethrough":"Зачеркнутый","Subscript":"Подстрочный","Superscript":"Надстрочный","Italic text":"Текст курсивом","Move out of an inline code style":"Выйти из встроенного стиля кода","Bold text":"Жирный текст","Underline text":"Подчеркнутый текст","Strikethrough text":"Зачеркнутый текст"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
