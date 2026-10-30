/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: translations } = {"id":{"dictionary":{"Insert HTML":"Sisipkan HTML","HTML snippet":"Potongan HTML","Paste raw HTML here...":"Tempelkan HTML apa adanya di sini...","Edit source":"Sunting sumber","Save changes":"Simpan perubahan","No preview available":"Pratinjau tidak tersedia","Empty snippet content":"Konten potongan kosong"}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'id' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
