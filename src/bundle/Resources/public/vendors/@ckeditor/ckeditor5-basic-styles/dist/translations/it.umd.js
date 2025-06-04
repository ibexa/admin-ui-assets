/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'it' ]: { dictionary, getPluralForm } } = {"it":{"dictionary":{"Bold":"Grassetto","Italic":"Corsivo","Underline":"Sottolineato","Code":"Codice","Strikethrough":"Barrato","Subscript":"Pedice","Superscript":"Apice","Italic text":"Testo in corsivo","Move out of an inline code style":"Esce da uno stile di codice in linea","Bold text":"Testo in grassetto","Underline text":"Testo sottolineato","Strikethrough text":"Testo barrato"},getPluralForm(n){return (n != 1);}}};
e[ 'it' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'it' ].dictionary = Object.assign( e[ 'it' ].dictionary, dictionary );
e[ 'it' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
