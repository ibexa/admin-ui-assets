/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'jv' ]: translations } = {"jv":{"dictionary":{"Bold":"Kandhel","Italic":"Miring","Underline":"Garis ngandhap","Code":"Kode","Strikethrough":"Seratan dicoret","Subscript":"","Superscript":"","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'jv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'jv' ].dictionary = Object.assign( e[ 'jv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'jv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
