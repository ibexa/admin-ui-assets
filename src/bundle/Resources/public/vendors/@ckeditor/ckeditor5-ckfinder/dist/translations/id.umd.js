/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: translations } = {"id":{"dictionary":{"Insert image or file":"Sisipkan gambar atau berkas","Could not obtain resized image URL.":"Gagal mendapatkan URL gambar terukur","Selecting resized image failed":"Gagal memilih gambar terukur","Could not insert image at the current position.":"Tidak dapat menyisipkan gambar pada posisi ini.","Inserting image failed":"Gagal menyisipkan gambar"}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'id' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
