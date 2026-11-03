/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: translations } = {"bg":{"dictionary":{"Bold":"Удебелен","Italic":"Курсив","Underline":"Подчертаване","Code":"Код","Strikethrough":"Зачертаване","Subscript":"Долен индекс","Superscript":"Горен индекс","Italic text":"Наклонен текст","Move out of an inline code style":"Излизане от подравнен стил на кодиране","Bold text":"Почернен текст","Underline text":"Подчертан текст","Strikethrough text":"Зачертан текст"}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bg' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
