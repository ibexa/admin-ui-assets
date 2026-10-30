/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sv' ]: translations } = {"sv":{"dictionary":{"Unlink":"Ta bort länk","Link":"Länk","Link URL":"Länkens URL","Link URL must not be empty.":"Länkens URL får inte vara tom.","Link image":"Länka bild","Link properties":"Länkegenskaper","Edit link":"Redigera länk","Open link in new tab":"Öppna länk i ny flik","Open in a new tab":"Öppna i en ny flik","Downloadable":"Nedladdningsbar","Create link":"Skapa länk","Move out of a link":"Flytta bort från länken","Displayed text":"Visad text","No links available":"Inga länkar tillgängliga","This link has no URL":"Den här länken har ingen URL"}}};
e[ 'sv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sv' ].dictionary = Object.assign( e[ 'sv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
