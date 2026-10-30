/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"media widget":"Nástroj pre médiá","Media URL":"URL média","Paste the media URL in the input.":"Vložte URL média.","Tip: Paste the URL into the content to embed faster.":"Tip: URL adresu média vložte do obsahu.","The URL must not be empty.":"Musíte zadať URL.","This media URL is not supported.":"URL média nie je podporovaná.","Insert media":"Vložiť média","Media embed":"Vloženie médií","Media":"Médiá","Media toolbar":"Nástroje pre médiá","Open media in new tab":"Otvoriť médiá na novej karte","Left aligned media":"Médiá zarovnané doľava","Centered media":"Centrované médiá","Right aligned media":"Médiá zarovnané vpravo","Resize media":"Zmeniť veľkosť média","Resize media to %0":"Zmeniť veľkosť média na %0","Resize media to the original size":"Zmeniť veľkosť média na pôvodnú veľkosť","Resize media (in %0)":"Zmeniť veľkosť média (o %0)","Custom media size":"Vlastná veľkosť média","Media resize list":"Zoznam na zmenu veľkosti médií","Media Resize":"Zmena veľkosti média"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
