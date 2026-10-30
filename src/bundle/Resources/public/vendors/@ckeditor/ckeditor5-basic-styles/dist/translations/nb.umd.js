/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nb' ]: translations } = {"nb":{"dictionary":{"Bold":"Fet","Italic":"Kursiv","Underline":"Understreking","Code":"Kode","Strikethrough":"Gjennomstreking","Subscript":"","Superscript":"","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'nb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nb' ].dictionary = Object.assign( e[ 'nb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
