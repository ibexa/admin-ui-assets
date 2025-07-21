/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: { dictionary, getPluralForm } } = {"id":{"dictionary":{"Insert code block":"Sisipkan blok kode","Plain text":"Teks mentah","Leaving %0 code snippet":"meninggalkan %0 cuplikan kode","Entering %0 code snippet":"memasuki %0 cuplikan kode","Entering code snippet":"memasuki cuplikan kode","Leaving code snippet":"meninggalkan cuplikan kode","Code block":"Blok kode"},getPluralForm(n){return 0;}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, dictionary );
e[ 'id' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
