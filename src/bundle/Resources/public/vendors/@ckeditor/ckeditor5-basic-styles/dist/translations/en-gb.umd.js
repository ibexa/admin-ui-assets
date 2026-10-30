/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-gb' ]: translations } = {"en-gb":{"dictionary":{"Bold":"Bold","Italic":"Italic","Underline":"Underline","Code":"Code","Strikethrough":"Strikethrough","Subscript":"Subscript","Superscript":"Superscript","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'en-gb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-gb' ].dictionary = Object.assign( e[ 'en-gb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'en-gb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
