/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ms' ]: translations } = {"ms":{"dictionary":{"Yellow marker":"Penanda kuning","Green marker":"Penanda hijau","Pink marker":"Penanda merah jambu","Blue marker":"Penanda biru","Red pen":"Pen merah","Green pen":"Pen hijau","Remove highlight":"Buang sorotan","Highlight":"Sorotan","Text highlight toolbar":"Bar alat capaian sorotan teks"}}};
e[ 'ms' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ms' ].dictionary = Object.assign( e[ 'ms' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ms' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
