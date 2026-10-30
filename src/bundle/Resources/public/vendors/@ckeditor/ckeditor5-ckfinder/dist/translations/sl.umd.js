/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sl' ]: translations } = {"sl":{"dictionary":{"Insert image or file":"Vstavi sliko ali datoteko","Could not obtain resized image URL.":"Ne morem pridobiti spremenjenega URL-ja slike.","Selecting resized image failed":"Izbira spremenjene slike ni uspela","Could not insert image at the current position.":"Slike ni mogoče vstaviti na trenutni položaj.","Inserting image failed":"Vstavljanje slike ni uspelo"}}};
e[ 'sl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sl' ].dictionary = Object.assign( e[ 'sl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
