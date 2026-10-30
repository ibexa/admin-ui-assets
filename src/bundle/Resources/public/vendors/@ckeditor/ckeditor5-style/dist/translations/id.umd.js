/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'id' ]: translations } = {"id":{"dictionary":{"Styles":"Gaya","Multiple styles":"Banyak gaya","Block styles":"Gaya blok","Text styles":"Gaya teks"}}};
e[ 'id' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'id' ].dictionary = Object.assign( e[ 'id' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'id' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
