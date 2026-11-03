/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nl' ]: translations } = {"nl":{"dictionary":{"Unlink":"Verwijder link","Link":"Link","Link URL":"Link URL","Link URL must not be empty.":"URL-link mag niet leeg zijn.","Link image":"Link afbeelding","Link properties":"Linkeigenschappen","Edit link":"Bewerk link","Open link in new tab":"Open link in nieuw tabblad","Open in a new tab":"Open een nieuw tabblad","Downloadable":"Downloadbaar","Create link":"Creëer link","Move out of a link":"Uit een link gaan","Displayed text":"Weergegeven tekst","No links available":"Geen links beschikbaar","This link has no URL":"Deze link heeft geen url"}}};
e[ 'nl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nl' ].dictionary = Object.assign( e[ 'nl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
