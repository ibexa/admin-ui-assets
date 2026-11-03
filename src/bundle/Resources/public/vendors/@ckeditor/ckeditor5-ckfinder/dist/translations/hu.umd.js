/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hu' ]: translations } = {"hu":{"dictionary":{"Insert image or file":"Kép, vagy fájl beszúrása","Could not obtain resized image URL.":"Az átméretezett kép URL-je nem érhető el.","Selecting resized image failed":"Az átméretezett kép kiválasztása sikertelen","Could not insert image at the current position.":"A jelenlegi helyen nem szúrható be a kép.","Inserting image failed":"A kép beszúrása sikertelen"}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
