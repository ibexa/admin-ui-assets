/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sv' ]: translations } = {"sv":{"dictionary":{"Bold":"Fet","Italic":"Kursiv","Underline":"Understrykning","Code":"Kod","Strikethrough":"Genomstruken","Subscript":"Nedsänkta tecken","Superscript":"Upphöjda tecken","Italic text":"Kursiv stil","Move out of an inline code style":"Flytta bort från inlinekodens stil","Bold text":"Fetstil","Underline text":"Understruken text","Strikethrough text":"Genomstruken text"}}};
e[ 'sv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sv' ].dictionary = Object.assign( e[ 'sv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
