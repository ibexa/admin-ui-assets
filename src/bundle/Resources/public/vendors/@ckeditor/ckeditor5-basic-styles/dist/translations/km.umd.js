/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'km' ]: translations } = {"km":{"dictionary":{"Bold":"ដិត","Italic":"ទ្រេត","Underline":"គូស​បន្ទាត់​ក្រោម","Code":"កូដ","Strikethrough":"ឆូតកណ្ដាល","Subscript":"អក្សរ​តូចក្រោម","Superscript":"អក្សរ​តូចលើ","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'km' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'km' ].dictionary = Object.assign( e[ 'km' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'km' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
