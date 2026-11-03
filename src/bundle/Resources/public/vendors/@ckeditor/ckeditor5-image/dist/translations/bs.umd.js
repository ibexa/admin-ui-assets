/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bs' ]: translations } = {"bs":{"dictionary":{"image widget":"","In line":"","Side image":"","Full size image":"","Left aligned image":"Lijevo poravnata slika","Centered image":"Centrirana slika","Right aligned image":"Desno poravnata slika","Change image text alternative":"Promijeni ALT atribut za sliku","Text alternative":"ALT atribut","Enter image caption":"Unesi naziv slike","Insert image":"Umetni sliku","Replace image":"","Upload from computer":"","Replace from computer":"","Upload image from computer":"","Image from computer":"","From computer":"","Replace image from computer":"","Upload failed":"Učitavanje slike nije uspjelo","You have no image upload permissions.":"","Image toolbar":"","Resize image":"Promijeni veličinu slike","Resize image to %0":"","Resize image to the original size":"Postavi originalnu veličinu slike","Resize image (in %0)":"","Custom image size":"","Image resize list":"Lista veličina slike","Insert image via URL":"Umetni sliku preko URLa","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"Ažuriraj URL slike","Caption for the image":"","Caption for image: %0":"","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"","Text Alternative":""}}};
e[ 'bs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bs' ].dictionary = Object.assign( e[ 'bs' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bs' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
