/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'eu' ]: { dictionary, getPluralForm } } = {"eu":{"dictionary":{"Insert image or file":"","Could not obtain resized image URL.":"","Selecting resized image failed":"","Could not insert image at the current position.":"","Inserting image failed":""},getPluralForm(n){return (n != 1);}}};
e[ 'eu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'eu' ].dictionary = Object.assign( e[ 'eu' ].dictionary, dictionary );
e[ 'eu' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
