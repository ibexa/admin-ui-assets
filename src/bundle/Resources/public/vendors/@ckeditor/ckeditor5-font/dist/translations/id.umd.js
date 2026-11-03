/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: translations } = {"id":{"dictionary":{"Font Size":"Ukuran Huruf","Tiny":"Sangat Kecil","Small":"Kecil","Big":"Besar","Huge":"Sangat Besar","Font Family":"Jenis Huruf","Default":"Bawaan","Font Color":"Warna Huruf","Font Background Color":"Warna Latar Huruf","Document colors":"Warna dokumen"}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'id' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
