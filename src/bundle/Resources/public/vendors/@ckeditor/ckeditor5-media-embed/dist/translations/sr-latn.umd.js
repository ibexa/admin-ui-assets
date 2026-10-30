/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr-latn' ]: translations } = {"sr-latn":{"dictionary":{"media widget":"Media widget","Media URL":"Media URL","Paste the media URL in the input.":" Nalepi medijski URL u polje za unos.","Tip: Paste the URL into the content to embed faster.":"Savet: Zalepite URL u sadržaj da bi ste ga brže ugradili.","The URL must not be empty.":"URL ne sme biti prazan.","This media URL is not supported.":"Ovaj media URL tip nije podržan.","Insert media":"Dodaj media","Media embed":"","Media":"","Media toolbar":"Mediji traka sa alatkama","Open media in new tab":"Otvorite medije u novoj kartici","Left aligned media":"","Centered media":"","Right aligned media":"","Resize media":"","Resize media to %0":"","Resize media to the original size":"","Resize media (in %0)":"","Custom media size":"","Media resize list":"","Media Resize":""}}};
e[ 'sr-latn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr-latn' ].dictionary = Object.assign( e[ 'sr-latn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr-latn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
