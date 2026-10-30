/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'tt' ]: translations } = {"tt":{"dictionary":{"Insert image or file":"","Could not obtain resized image URL.":"","Selecting resized image failed":"","Could not insert image at the current position.":"","Inserting image failed":""}}};
e[ 'tt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'tt' ].dictionary = Object.assign( e[ 'tt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'tt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
