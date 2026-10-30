/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Bold":"Подебљано","Italic":"Курзив","Underline":"Подвучен","Code":"Код","Strikethrough":"Прецртан","Subscript":"Индекс доле","Superscript":"Индекс горе","Italic text":"Tekst u kurzivu","Move out of an inline code style":"Izađi iz inline stila","Bold text":"Podebljan tekst","Underline text":"Podvučen tekst","Strikethrough text":"Precrtan tekst"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
