/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Bold":"Pogrubienie","Italic":"Kursywa","Underline":"Podkreślenie","Code":"Kod","Strikethrough":"Przekreślenie","Subscript":"Indeks dolny","Superscript":"Indeks górny","Italic text":"Zmienia tekst na kursywę","Move out of an inline code style":"Przenosi zaznaczenie poza styl kodu inline","Bold text":"Pogrubia tekst","Underline text":"Podkreśla tekst","Strikethrough text":"Przekreśla tekst"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
