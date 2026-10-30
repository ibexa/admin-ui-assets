/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"media widget":"widget osadzenia mediów","Media URL":"Adres URL","Paste the media URL in the input.":"Wklej adres URL mediów do pola.","Tip: Paste the URL into the content to embed faster.":"Wskazówka: Wklej URL do treści edytora, by łatwiej osadzić media.","The URL must not be empty.":"Adres URL nie może być pusty.","This media URL is not supported.":"Ten rodzaj adresu URL nie jest obsługiwany.","Insert media":"Wstaw media","Media embed":"Osadzanie multimediów","Media":"Nośniki","Media toolbar":"Pasek narzędzi mediów","Open media in new tab":"Otwórz media w nowej zakładce","Left aligned media":"Multimedia wyrównane do lewej","Centered media":"Multimedia wyśrodkowane","Right aligned media":"Multimedia wyrównane do prawej","Resize media":"Zmień rozmiar multimediów","Resize media to %0":"Zmień rozmiar multimediów na %0","Resize media to the original size":"Przywróć oryginalny rozmiar multimediów","Resize media (in %0)":"Zmień rozmiar multimediów (%0)","Custom media size":"Niestandardowy rozmiar multimediów","Media resize list":"Lista opcji zmiany rozmiaru multimediów","Media Resize":"Zmiana rozmiaru multimediów"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
