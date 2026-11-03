/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: translations } = {"ro":{"dictionary":{"Insert image or file":"Inserează imagine sau fișier","Could not obtain resized image URL.":"Nu se poate obtine URL-ul imaginii redimensionate.","Selecting resized image failed":"Selecția imaginii redimensionate eșuată","Could not insert image at the current position.":"Nu se poate insera imaginea la poziția curentă.","Inserting image failed":"Inserție imagine eșuată"}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ro' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
