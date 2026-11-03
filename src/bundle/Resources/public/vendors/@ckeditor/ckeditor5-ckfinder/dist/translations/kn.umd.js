/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'kn' ]: translations } = {"kn":{"dictionary":{"Insert image or file":"","Could not obtain resized image URL.":"","Selecting resized image failed":"","Could not insert image at the current position.":"","Inserting image failed":""}}};
e[ 'kn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'kn' ].dictionary = Object.assign( e[ 'kn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'kn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
