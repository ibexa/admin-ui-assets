/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'kk' ]: translations } = {"kk":{"dictionary":{"Insert image or file":"","Could not obtain resized image URL.":"","Selecting resized image failed":"","Could not insert image at the current position.":"","Inserting image failed":""}}};
e[ 'kk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'kk' ].dictionary = Object.assign( e[ 'kk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'kk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
