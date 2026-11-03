/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sq' ]: translations } = {"sq":{"dictionary":{"Bold":"Trash","Italic":"Pjerrtë","Underline":"Nënvizuar","Code":"Kod","Strikethrough":"Vi në mes","Subscript":"Abonohu","Superscript":"Mbishkrim","Italic text":"","Move out of an inline code style":"","Bold text":"","Underline text":"","Strikethrough text":""}}};
e[ 'sq' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sq' ].dictionary = Object.assign( e[ 'sq' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sq' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
