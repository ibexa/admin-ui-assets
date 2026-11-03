/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es' ]: translations } = {"es":{"dictionary":{"Bold":"Negrita","Italic":"Cursiva","Underline":"Subrayado","Code":"Código","Strikethrough":"Tachado","Subscript":"Subíndice","Superscript":"Superíndice","Italic text":"Texto en cursiva","Move out of an inline code style":"Sale de un estilo de código en línea","Bold text":"Texto en negrita","Underline text":"Subraya el texto","Strikethrough text":"Tacha el texto"}}};
e[ 'es' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es' ].dictionary = Object.assign( e[ 'es' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
