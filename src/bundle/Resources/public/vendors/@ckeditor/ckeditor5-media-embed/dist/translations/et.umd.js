/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'et' ]: translations } = {"et":{"dictionary":{"media widget":"meedia vidin","Media URL":"Meedia URL","Paste the media URL in the input.":"Aseta meedia URL sisendi lahtrisse.","Tip: Paste the URL into the content to embed faster.":"Vihje: asetades meedia URLi otse sisusse saab selle lisada kiiremini.","The URL must not be empty.":"URL-i lahter ei tohi olla tühi.","This media URL is not supported.":"See meedia URL pole toetatud.","Insert media":"Sisesta meedia","Media embed":"Meedium manustatud","Media":"Sisu","Media toolbar":"Meedia tööriistariba","Open media in new tab":"Avage meedia uuel vahekaardil","Left aligned media":"Vasakule joondatud meedia","Centered media":"Keskele joondatud meedia","Right aligned media":"Paremale joondatud meedia","Resize media":"Muuda meedia suurust","Resize media to %0":"Muuda meedia suuruseks %0","Resize media to the original size":"Taasta meedia algne suurus","Resize media (in %0)":"Meedia suuruse muutmine (%0)","Custom media size":"Kohandatud meedia suurus","Media resize list":"Meedia suuruse muutmise loend","Media Resize":"Meedia suuruse muutmine"}}};
e[ 'et' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'et' ].dictionary = Object.assign( e[ 'et' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'et' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
