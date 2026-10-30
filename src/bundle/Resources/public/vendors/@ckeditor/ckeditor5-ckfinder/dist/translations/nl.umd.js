/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nl' ]: translations } = {"nl":{"dictionary":{"Insert image or file":"Voeg afbeelding of bestand in","Could not obtain resized image URL.":"Het is niet gelukt de geschaalde afbeelding URL te verkrijgen.","Selecting resized image failed":"De geschaalde afbeelding selecteren is niet gelukt","Could not insert image at the current position.":"Kan afbeelding niet op de huidige positie invoegen.","Inserting image failed":"Afbeelding invoegen niet gelukt"}}};
e[ 'nl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nl' ].dictionary = Object.assign( e[ 'nl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
