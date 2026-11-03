/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hr' ]: translations } = {"hr":{"dictionary":{"image widget":"Slika widget","In line":"U istom redu","Side image":"Slika sa strane","Full size image":"Slika pune veličine","Left aligned image":"Lijevo poravnata slika","Centered image":"Centrirana slika","Right aligned image":"Slika poravnata desno","Change image text alternative":"Promijeni alternativni tekst slike","Text alternative":"Alternativni tekst","Enter image caption":"Unesite naslov slike","Insert image":"Umetni sliku","Replace image":"","Upload from computer":"","Replace from computer":"","Upload image from computer":"","Image from computer":"","From computer":"","Replace image from computer":"","Upload failed":"Slanje nije uspjelo","You have no image upload permissions.":"","Image toolbar":"Traka za slike","Resize image":"Promijeni veličinu slike","Resize image to %0":"Promijeni veličinu slike u %0","Resize image to the original size":"Vrati veličinu slike na originalnu veličinu","Resize image (in %0)":"","Custom image size":"","Image resize list":"Lista veličina slika","Insert image via URL":"Ubaci sliku putem URLa","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"Snimi URL slike","Caption for the image":"Naslov slike","Caption for image: %0":"Naslov slike: %0","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"","Text Alternative":""}}};
e[ 'hr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hr' ].dictionary = Object.assign( e[ 'hr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
