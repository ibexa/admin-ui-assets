/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'jv' ]: translations } = {"jv":{"dictionary":{"Insert image or file":"Tambahaken berkas utawi gambar","Could not obtain resized image URL.":"Mboten saged mundhut URL gambar ingkang dipunebah ukuranipun","Selecting resized image failed":"Gagal milih gambar ingkang dipunebah ukuranipun","Could not insert image at the current position.":"Mboten saged mlebetaken gambar wonten papan menika","Inserting image failed":"Gagal mlebetaken gambar"}}};
e[ 'jv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'jv' ].dictionary = Object.assign( e[ 'jv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'jv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
