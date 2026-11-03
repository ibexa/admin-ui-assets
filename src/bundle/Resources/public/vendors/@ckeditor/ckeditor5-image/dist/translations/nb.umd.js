/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nb' ]: translations } = {"nb":{"dictionary":{"image widget":"Bilde-widget","In line":"","Side image":"Sidebilde","Full size image":"Bilde i full størrelse","Left aligned image":"Venstrejustert bilde","Centered image":"Midtstilt bilde","Right aligned image":"Høyrejustert bilde","Change image text alternative":"Endre tekstalternativ for bilde","Text alternative":"Tekstalternativ for bilde","Enter image caption":"Skriv inn bildetekst","Insert image":"Sett inn bilde","Replace image":"","Upload from computer":"","Replace from computer":"","Upload image from computer":"","Image from computer":"","From computer":"","Replace image from computer":"","Upload failed":"Opplasting feilet","You have no image upload permissions.":"","Image toolbar":"","Resize image":"","Resize image to %0":"","Resize image to the original size":"","Resize image (in %0)":"","Custom image size":"","Image resize list":"","Insert image via URL":"","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"","Caption for the image":"","Caption for image: %0":"","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"","Text Alternative":""}}};
e[ 'nb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nb' ].dictionary = Object.assign( e[ 'nb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
