/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ms' ]: translations } = {"ms":{"dictionary":{"Font Size":"Saiz fon","Tiny":"Halus","Small":"Kecil","Big":"Besar","Huge":"Gergasi","Font Family":"Keluarga Fon","Default":"Lalai","Font Color":"Warna Fon","Font Background Color":"Warna Latar Belakang Fon","Document colors":"Warna dokumen"}}};
e[ 'ms' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ms' ].dictionary = Object.assign( e[ 'ms' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ms' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
