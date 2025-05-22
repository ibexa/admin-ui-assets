/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: { dictionary, getPluralForm } } = {"sr":{"dictionary":{"Bold":"Подебљано","Italic":"Курзив","Underline":"Подвучен","Code":"Код","Strikethrough":"Прецртан","Subscript":"Индекс доле","Superscript":"Индекс горе","Italic text":"Tekst u kurzivu","Move out of an inline code style":"Izađi iz inline stila","Bold text":"Podebljan tekst","Underline text":"Podvučen tekst","Strikethrough text":"Precrtan tekst"},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, dictionary );
e[ 'sr' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
