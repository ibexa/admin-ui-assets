/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'it' ]: translations } = {"it":{"dictionary":{"Bold":"Grassetto","Italic":"Corsivo","Underline":"Sottolineato","Code":"Codice","Strikethrough":"Barrato","Subscript":"Pedice","Superscript":"Apice","Italic text":"Testo in corsivo","Move out of an inline code style":"Esce da uno stile di codice in linea","Bold text":"Testo in grassetto","Underline text":"Testo sottolineato","Strikethrough text":"Testo barrato"}}};
e[ 'it' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'it' ].dictionary = Object.assign( e[ 'it' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'it' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
