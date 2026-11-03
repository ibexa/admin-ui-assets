/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sl' ]: translations } = {"sl":{"dictionary":{"Bold":"Krepko","Italic":"Poševno","Underline":"Podčrtaj","Code":"Koda","Strikethrough":"Prečrtano","Subscript":"Naročnik","Superscript":"Nadpis","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'sl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sl' ].dictionary = Object.assign( e[ 'sl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
