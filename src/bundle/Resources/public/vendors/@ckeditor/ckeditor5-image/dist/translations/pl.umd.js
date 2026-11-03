/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"image widget":"Obraz","In line":"W linii","Side image":"Obraz dosunięty do brzegu, oblewany tekstem","Full size image":"Obraz w pełnym rozmiarze","Left aligned image":"Obraz wyrównany do lewej","Centered image":"Obraz wyrównany do środka","Right aligned image":"Obraz wyrównany do prawej","Change image text alternative":"Zmień tekst zastępczy obrazka","Text alternative":"Tekst zastępczy obrazka","Enter image caption":"Wstaw tytuł obrazka","Insert image":"Wstaw obraz","Replace image":"Zastąp obraz","Upload from computer":"Prześlij z komputera","Replace from computer":"Zastąp z komputera","Upload image from computer":"Prześlij obraz z komputera","Image from computer":"Obraz z komputera","From computer":"Z komputera","Replace image from computer":"Zastąp obraz z komputera","Upload failed":"Przesyłanie obrazu nie powiodło się","You have no image upload permissions.":"Nie masz uprawnień do przesyłania obrazów.","Image toolbar":"Pasek narzędzi obrazka","Resize image":"Zmień rozmiar obrazka","Resize image to %0":"Zmień rozmiar do %0","Resize image to the original size":"Przywróć oryginalny rozmiar obrazu","Resize image (in %0)":"Zmień rozmiar obrazu (w %0)","Custom image size":"Niestandardowy rozmiar obrazu","Image resize list":"Lista: zmiana wielkości obrazu","Insert image via URL":"Wstaw obraz z adresu URL","Insert via URL":"Wstaw przez URL","Image via URL":"Obraz przez URL","Via URL":"Przez URL","Update image URL":"Uaktualnij obraz z adresu URL","Caption for the image":"Nagłówek do obrazu","Caption for image: %0":"Nagłówek do obrazu: %0","Uploading image":"Trwa przesyłanie obrazu","Image upload complete":"Przesyłanie obrazu zakończone","Error during image upload":"Błąd podczas przesyłania obrazu","Image":"Obraz","Image Resize":"Zmiana rozmiaru obrazu","Text Alternative":"Alternatywny tekst"}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
