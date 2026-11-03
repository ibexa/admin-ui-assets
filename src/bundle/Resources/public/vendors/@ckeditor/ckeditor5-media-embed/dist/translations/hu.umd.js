/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hu' ]: translations } = {"hu":{"dictionary":{"media widget":"Média widget","Media URL":"Média URL","Paste the media URL in the input.":"Illessze be a média URL-jét.","Tip: Paste the URL into the content to embed faster.":"Tipp: Illessze be a média URL-jét a tartalomba.","The URL must not be empty.":"Az URL nem lehet üres.","This media URL is not supported.":"Ez a média URL típus nem támogatott.","Insert media":"Média beszúrása","Media embed":"Média beágyazása","Media":"Média","Media toolbar":"Média eszköztár","Open media in new tab":"Nyissa meg a médiát új lapon","Left aligned media":"Balra igazított média","Centered media":"Középre igazított média","Right aligned media":"Jobbra igazított média","Resize media":"Média átméretezése","Resize media to %0":"Média átméretezése erre: %0","Resize media to the original size":"Média átméretezése az eredeti méretre","Resize media (in %0)":"Média átméretezése (%0-ban)","Custom media size":"Egyéni médiaméret","Media resize list":"Média átméretezése lista","Media Resize":"Média átméretezése"}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
