/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'af' ]: translations } = {"af":{"dictionary":{"image widget":"","In line":"","Side image":"","Full size image":"","Left aligned image":"","Centered image":"","Right aligned image":"","Change image text alternative":"","Text alternative":"","Enter image caption":"","Insert image":"","Replace image":"","Upload from computer":"","Replace from computer":"","Upload image from computer":"","Image from computer":"","From computer":"","Replace image from computer":"","Upload failed":"","You have no image upload permissions.":"","Image toolbar":"","Resize image":"","Resize image to %0":"","Resize image to the original size":"","Resize image (in %0)":"","Custom image size":"","Image resize list":"","Insert image via URL":"","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"","Caption for the image":"","Caption for image: %0":"","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"","Text Alternative":""}}};
e[ 'af' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'af' ].dictionary = Object.assign( e[ 'af' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'af' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
