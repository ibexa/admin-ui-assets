/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: translations } = {"pt-br":{"dictionary":{"Bold":"Negrito","Italic":"Itálico","Underline":"Sublinhado","Code":"Código","Strikethrough":"Tachado","Subscript":"Subscrito","Superscript":"Sobrescrito","Italic text":"Texto em itálico","Move out of an inline code style":"Sair de um estilo de código inline","Bold text":"Texto em negrito","Underline text":"Texto sublinhado","Strikethrough text":"Texto com riscado"}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt-br' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
