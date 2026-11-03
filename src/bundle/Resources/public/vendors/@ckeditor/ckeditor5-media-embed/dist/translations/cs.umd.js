/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'cs' ]: translations } = {"cs":{"dictionary":{"media widget":"ovládací prvek médií","Media URL":"URL adresa","Paste the media URL in the input.":"Vložte URL média do vstupního pole.","Tip: Paste the URL into the content to embed faster.":"Rada: Vložte URL přímo do editoru pro rychlejší vnoření.","The URL must not be empty.":"URL adresa musí být vyplněna.","This media URL is not supported.":"Tato adresa bohužel není podporována.","Insert media":"Vložit média","Media embed":"Vložení médií","Media":"Média","Media toolbar":"Panel nástrojů médií","Open media in new tab":"Otevřete média na nové kartě","Left aligned media":"Média zarovnaná vlevo","Centered media":"Média zarovnaná do středu","Right aligned media":"Média zarovnaná vpravo","Resize media":"Změnit velikost média","Resize media to %0":"Změnit velikost média na %0","Resize media to the original size":"Změnit velikost média na původní velikost","Resize media (in %0)":"Změnit velikost média (v %0)","Custom media size":"Vlastní velikost média","Media resize list":"Seznam pro změnu velikosti médií","Media Resize":"Změna velikosti médií"}}};
e[ 'cs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'cs' ].dictionary = Object.assign( e[ 'cs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'cs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
