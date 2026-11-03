/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr-latn' ]: translations } = {"sr-latn":{"dictionary":{"image widget":"modul sa slikom","In line":"U redu","Side image":"Bočna slika","Full size image":"Slika u punoj veličini","Left aligned image":"Leva slika","Centered image":"Slika u sredini","Right aligned image":"Desna slika","Change image text alternative":"Izmena alternativnog teksta","Text alternative":"Alternativni tekst","Enter image caption":"Odredi tekst ispod slike","Insert image":"Dodaj sliku","Replace image":"Zamenite sliku","Upload from computer":"Otpremite sa računara","Replace from computer":"Zamenite sa računara","Upload image from computer":"Otpremite sliku sa računara","Image from computer":"Slika sa računara","From computer":"Sa kompjutera","Replace image from computer":"Zamenite sliku sa računara","Upload failed":"Postavljanje neuspešno","You have no image upload permissions.":"","Image toolbar":"Slika traka sa alatkama","Resize image":"Promenite veličinu slike","Resize image to %0":"Promenite veličinu slike na% 0","Resize image to the original size":"Promenite veličinu slike do originalne veličine","Resize image (in %0)":"Promenite veličinu slike (u %0)","Custom image size":"Prilagođena veličina slike","Image resize list":"Lista veličine slike","Insert image via URL":"Ubaci sliku preko URL-a","Insert via URL":"Ubaci preko URL-a","Image via URL":"Slika preko URL-a","Via URL":"Preko URL-a","Update image URL":"Ažuriraj URL slike","Caption for the image":"Natpis za sliku","Caption for image: %0":"Natpis za sliku:%0","Uploading image":"Otpremanje slike","Image upload complete":"Otpremanje slike je završeno","Error during image upload":"Greška tokom otpremanja slike","Image":"Slika","Image Resize":"","Text Alternative":""}}};
e[ 'sr-latn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr-latn' ].dictionary = Object.assign( e[ 'sr-latn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr-latn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
