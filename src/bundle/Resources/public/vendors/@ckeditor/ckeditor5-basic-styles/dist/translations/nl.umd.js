/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nl' ]: translations } = {"nl":{"dictionary":{"Bold":"Vet","Italic":"Cursief","Underline":"Onderlijnen","Code":"Code","Strikethrough":"Doorhalen","Subscript":"Subscript","Superscript":"Superscript","Italic text":"Cursieve tekst","Move out of an inline code style":"Uit een stijl voor code op één regel gaan","Bold text":"Vetgedrukte tekst","Underline text":"Onderstreepte tekst","Strikethrough text":"Doorgehaalde tekst"}}};
e[ 'nl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nl' ].dictionary = Object.assign( e[ 'nl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
