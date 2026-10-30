/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hr' ]: translations } = {"hr":{"dictionary":{"Insert HTML":"Ubaci HTML","HTML snippet":"HTML isječak","Paste raw HTML here...":"Zalijepi ovdje čisti HTML...","Edit source":"Uredi izvorni kod","Save changes":"Snimi promjene","No preview available":"Pregled nije dostupan","Empty snippet content":"Ukloni sadržaj isječka"}}};
e[ 'hr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hr' ].dictionary = Object.assign( e[ 'hr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
