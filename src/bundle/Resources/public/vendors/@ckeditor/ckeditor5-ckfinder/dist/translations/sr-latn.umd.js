/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr-latn' ]: translations } = {"sr-latn":{"dictionary":{"Insert image or file":"Dodaj sliku ili fajl","Could not obtain resized image URL.":"URL slikа promenjeniih dimenzija nije dostupna.","Selecting resized image failed":"Odabir slike promenjenih dimenzija nije uspešnо","Could not insert image at the current position.":"Nemoguće je dodati sliku na ovo mesto.","Inserting image failed":"Dodavanje slike je neuspešno"}}};
e[ 'sr-latn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr-latn' ].dictionary = Object.assign( e[ 'sr-latn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr-latn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
