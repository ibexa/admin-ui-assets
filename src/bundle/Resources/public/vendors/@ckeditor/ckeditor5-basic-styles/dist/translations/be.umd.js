/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: { dictionary, getPluralForm } } = {"be":{"dictionary":{"Bold":"Тоўсты","Italic":"Курсіў","Underline":"Падкрэслены","Code":"Код","Strikethrough":"Перакрэслены","Subscript":"Ніжні індэкс","Superscript":"Верхні індэкс","Italic text":"Текст курсівам","Move out of an inline code style":"Выйсці з убудаванага сцілю","Bold text":"Тоўсты тэкст","Underline text":"Падкрэслены тэкст","Strikethrough text":"Перакрэслены тэкст"},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, dictionary );
e[ 'be' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
