/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ms' ]: translations } = {"ms":{"dictionary":{"Copy selected content":"Salin kandungan yang dipilih","Paste content":"Tampal kandungan","Paste content as plain text":"Tampal kandungan sebagai teks kosong"}}};
e[ 'ms' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ms' ].dictionary = Object.assign( e[ 'ms' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ms' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
