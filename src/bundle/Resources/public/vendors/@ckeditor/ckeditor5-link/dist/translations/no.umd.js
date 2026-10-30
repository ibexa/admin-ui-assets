/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'no' ]: translations } = {"no":{"dictionary":{"Unlink":"Fjern lenke","Link":"Lenke","Link URL":"Lenke-URL","Link URL must not be empty.":"Link-URL kan ikke være tom.","Link image":"Bildelenke","Link properties":"Lenkeegenskaper","Edit link":"Rediger lenke","Open link in new tab":"Åpne lenke i ny fane","Open in a new tab":"Åpne i ny fane","Downloadable":"Nedlastbar","Create link":"Opprett lenke","Move out of a link":"Flytt ut fra en lenke","Displayed text":"Vist tekst","No links available":"Ingen lenker tilgjengelig","This link has no URL":"Denne lenken har ingen URL"}}};
e[ 'no' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'no' ].dictionary = Object.assign( e[ 'no' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'no' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
