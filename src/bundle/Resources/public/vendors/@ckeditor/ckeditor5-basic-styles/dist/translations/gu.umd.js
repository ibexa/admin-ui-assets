/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'gu' ]: translations } = {"gu":{"dictionary":{"Bold":"ઘાટુ - બોલ્ડ્","Italic":"ત્રાંસુ - ઇટલિક્","Underline":"નીચે લિટી - અન્ડરલાઇન્","Code":"","Strikethrough":"","Subscript":"","Superscript":"","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'gu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'gu' ].dictionary = Object.assign( e[ 'gu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'gu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
