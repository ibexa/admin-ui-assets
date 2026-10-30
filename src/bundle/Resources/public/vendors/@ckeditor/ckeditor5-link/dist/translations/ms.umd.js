/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ms' ]: translations } = {"ms":{"dictionary":{"Unlink":"Buang pautan","Link":"Pautkan","Link URL":"Pautkan URL","Link URL must not be empty.":"URL pautan tidak boleh kosong.","Link image":"Pautkan imej","Link properties":"Sifat pautan","Edit link":"Sunting pautan","Open link in new tab":"Buka pautan dalam tab baru","Open in a new tab":"Buka dalam tab baru","Downloadable":"Boleh dimuat turun","Create link":"Buat pautan","Move out of a link":"Alih keluar pautan","Displayed text":"Teks yang dipaparkan","No links available":"Tiada pautan tersedia","This link has no URL":"Pautan ini tidak mempunyai URL"}}};
e[ 'ms' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ms' ].dictionary = Object.assign( e[ 'ms' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ms' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
