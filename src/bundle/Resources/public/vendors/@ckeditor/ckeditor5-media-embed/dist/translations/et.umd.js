/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'et' ]: { dictionary, getPluralForm } } = {"et":{"dictionary":{"media widget":"meedia vidin","Media URL":"Meedia URL","Paste the media URL in the input.":"Aseta meedia URL sisendi lahtrisse.","Tip: Paste the URL into the content to embed faster.":"Vihje: asetades meedia URLi otse sisusse saab selle lisada kiiremini.","The URL must not be empty.":"URL-i lahter ei tohi olla tühi.","This media URL is not supported.":"See meedia URL pole toetatud.","Insert media":"Sisesta meedia","Media":"Sisu","Media toolbar":"Meedia tööriistariba","Open media in new tab":"Avage meedia uuel vahekaardil","Media embed":"Meedium manustatud"},getPluralForm(n){return (n != 1);}}};
e[ 'et' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'et' ].dictionary = Object.assign( e[ 'et' ].dictionary, dictionary );
e[ 'et' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
