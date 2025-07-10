/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'gl' ]: { dictionary, getPluralForm } } = {"gl":{"dictionary":{"Bold":"Grosa","Italic":"Itálica","Underline":"Subliñado","Code":"Código","Strikethrough":"Riscado","Subscript":"Subíndice","Superscript":"Superíndice","Italic text":"Texto en cursiva","Move out of an inline code style":"Saír dun estilo de código en liña","Bold text":"Texto en grosa","Underline text":"Texto subliñado","Strikethrough text":"Texto riscado"},getPluralForm(n){return (n != 1);}}};
e[ 'gl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'gl' ].dictionary = Object.assign( e[ 'gl' ].dictionary, dictionary );
e[ 'gl' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
