/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: translations } = {"uz":{"dictionary":{"Bold":"Qalin","Italic":"Kursiv","Underline":"Tagi chizilgan","Code":"Manba kodi","Strikethrough":"Chizilgan","Subscript":"Pastki yozuv","Superscript":"Yuqori yozuv","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uz' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
