/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt' ]: translations } = {"pt":{"dictionary":{"Bold":"Negrito","Italic":"Itálico","Underline":"Sublinhado","Code":"Código","Strikethrough":"Rasurar","Subscript":"Subscrito","Superscript":"Sobrescrito","Italic text":"Texto em itálico","Move out of an inline code style":"Sair de um estilo de código inline","Bold text":"Texto em negrito","Underline text":"Sublinhar texto","Strikethrough text":"Texto rasurado"}}};
e[ 'pt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt' ].dictionary = Object.assign( e[ 'pt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
