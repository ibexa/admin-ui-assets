/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Bold":"Жирний","Italic":"Курсив","Underline":"Підкреслений","Code":"Код","Strikethrough":"Закреслений","Subscript":"Нижній індекс","Superscript":"Верхній індекс","Italic text":"Курсив","Move out of an inline code style":"Вийти зі стилю вбудованого коду","Bold text":"Жирний шрифт","Underline text":"Підкреслений","Strikethrough text":"Закреслений"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
