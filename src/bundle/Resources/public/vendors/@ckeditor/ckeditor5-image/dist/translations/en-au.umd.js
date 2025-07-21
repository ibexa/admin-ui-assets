/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-au' ]: { dictionary, getPluralForm } } = {"en-au":{"dictionary":{"image widget":"image widget","Wrap text":"Wrap text","Break text":"Break text","In line":"In line","Side image":"Side image","Full size image":"Full size image","Left aligned image":"Left aligned image","Centered image":"Centred image","Right aligned image":"Right aligned image","Change image text alternative":"Change image text alternative","Text alternative":"Text alternative","Enter image caption":"Enter image caption","Insert image":"Insert image","Replace image":"","Upload from computer":"","Replace from computer":"","Upload image from computer":"","Image from computer":"","From computer":"","Replace image from computer":"","Upload failed":"Upload failed","You have no image upload permissions.":"","Image toolbar":"Image toolbar","Resize image":"Resize image","Resize image to %0":"Resize image to %0","Resize image to the original size":"Resize image to the original size","Resize image (in %0)":"","Original":"Original","Custom image size":"","Custom":"","Image resize list":"Image resize list","Insert image via URL":"Insert image via URL","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"Update image URL","Caption for the image":"Caption for the image","Caption for image: %0":"Caption for image: %0","The value must not be empty.":"","The value should be a plain number.":"","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"Image Resize","Text Alternative":"Text Alternative"},getPluralForm(n){return (n != 1);}}};
e[ 'en-au' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-au' ].dictionary = Object.assign( e[ 'en-au' ].dictionary, dictionary );
e[ 'en-au' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
