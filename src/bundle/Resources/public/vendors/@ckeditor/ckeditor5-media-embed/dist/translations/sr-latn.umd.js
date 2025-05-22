/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr-latn' ]: { dictionary, getPluralForm } } = {"sr-latn":{"dictionary":{"media widget":"Media widget","Media URL":"Media URL","Paste the media URL in the input.":" Nalepi medijski URL u polje za unos.","Tip: Paste the URL into the content to embed faster.":"Savet: Zalepite URL u sadržaj da bi ste ga brže ugradili.","The URL must not be empty.":"URL ne sme biti prazan.","This media URL is not supported.":"Ovaj media URL tip nije podržan.","Insert media":"Dodaj media","Media":"","Media toolbar":"Mediji traka sa alatkama","Open media in new tab":"Otvorite medije u novoj kartici","Media embed":""},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'sr-latn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr-latn' ].dictionary = Object.assign( e[ 'sr-latn' ].dictionary, dictionary );
e[ 'sr-latn' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
