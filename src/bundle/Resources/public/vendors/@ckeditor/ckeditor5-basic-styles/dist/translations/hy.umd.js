/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hy' ]: translations } = {"hy":{"dictionary":{"Bold":"Թավագիր","Italic":"Շեղագիր","Underline":"Ընդգծել","Code":"Կոդ","Strikethrough":"Գծանշել","Subscript":"Ենթատեքստ","Superscript":"Գերագիր","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'hy' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hy' ].dictionary = Object.assign( e[ 'hy' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hy' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
