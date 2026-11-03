/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'gl' ]: translations } = {"gl":{"dictionary":{"Bold":"Grosa","Italic":"Itálica","Underline":"Subliñado","Code":"Código","Strikethrough":"Riscado","Subscript":"Subíndice","Superscript":"Superíndice","Italic text":"Texto en cursiva","Move out of an inline code style":"Saír dun estilo de código en liña","Bold text":"Texto en grosa","Underline text":"Texto subliñado","Strikethrough text":"Texto riscado"}}};
e[ 'gl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'gl' ].dictionary = Object.assign( e[ 'gl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'gl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
