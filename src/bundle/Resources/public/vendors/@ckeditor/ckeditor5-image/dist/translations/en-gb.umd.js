/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-gb' ]: translations } = {"en-gb":{"dictionary":{"image widget":"Image widget","In line":"","Side image":"Side image","Full size image":"Full size image","Left aligned image":"Left aligned image","Centered image":"Centred image","Right aligned image":"Right aligned image","Change image text alternative":"Change image text alternative","Text alternative":"Text alternative","Enter image caption":"Enter image caption","Insert image":"Insert image","Replace image":"","Upload from computer":"","Replace from computer":"","Upload image from computer":"","Image from computer":"","From computer":"","Replace image from computer":"","Upload failed":"Upload failed","You have no image upload permissions.":"","Image toolbar":"","Resize image":"","Resize image to %0":"","Resize image to the original size":"","Resize image (in %0)":"","Custom image size":"","Image resize list":"","Insert image via URL":"","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"","Caption for the image":"","Caption for image: %0":"","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"Image Resize","Text Alternative":"Text Alternative"}}};
e[ 'en-gb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-gb' ].dictionary = Object.assign( e[ 'en-gb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'en-gb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
