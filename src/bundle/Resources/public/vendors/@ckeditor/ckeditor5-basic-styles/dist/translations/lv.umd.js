/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lv' ]: translations } = {"lv":{"dictionary":{"Bold":"Trekns","Italic":"Kursīvs","Underline":"Pasvītrots","Code":"Kods","Strikethrough":"Nosvītrots","Subscript":"Apakšraksts","Superscript":"Augšraksts","Italic text":"Teksts slīprakstā","Move out of an inline code style":"Iziet no iekļautā koda stila","Bold text":"Teksts treknrakstā","Underline text":"Pasvītrot tekstu","Strikethrough text":"Pārsvītrot teksts"}}};
e[ 'lv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lv' ].dictionary = Object.assign( e[ 'lv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
