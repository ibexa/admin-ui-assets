/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bs' ]: translations } = {"bs":{"dictionary":{"Insert HTML":"Umetni HTML","HTML snippet":"HTML odlomak","Paste raw HTML here...":"Zalijepi HTML ovdje...","Edit source":"Uredi izvor","Save changes":"Sačuvaj izmjene","No preview available":"Pregled nedostupan","Empty snippet content":"HTML odlomak nema sadžaj"}}};
e[ 'bs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bs' ].dictionary = Object.assign( e[ 'bs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
