/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: { dictionary, getPluralForm } } = {"id":{"dictionary":{"Open file manager":"Buka manajer berkas","Cannot determine a category for the uploaded file.":"Tak dapat menentukan kategori untuk berkas yang terunggah.","Cannot access default workspace.":"Tidak dapat mengakses ruang kerja baku.","You have no image editing permissions.":"Anda tidak memiliki izin mengedit gambar.","Edit image":"Edit gambar","Processing the edited image.":"Memroses gambar yang diedit","Server failed to process the image.":"Server gagal memroses gambar","Failed to determine category of edited image.":"Gagar menentukan kategori gambar yang diedit"},getPluralForm(n){return 0;}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, dictionary );
e[ 'id' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
