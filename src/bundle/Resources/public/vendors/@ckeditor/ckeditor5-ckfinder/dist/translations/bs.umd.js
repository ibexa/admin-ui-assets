/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bs' ]: translations } = {"bs":{"dictionary":{"Insert image or file":"Umetni sliku ili datoteku","Could not obtain resized image URL.":"Nije moguće dobiti URL slike.","Selecting resized image failed":"Odabir slike nije uspješan","Could not insert image at the current position.":"Nije moguće umetnuti sliku na poziciju.","Inserting image failed":"Umetanje slike neuspješno"}}};
e[ 'bs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bs' ].dictionary = Object.assign( e[ 'bs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
