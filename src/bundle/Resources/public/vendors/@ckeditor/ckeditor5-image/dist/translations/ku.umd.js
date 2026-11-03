/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ku' ]: translations } = {"ku":{"dictionary":{"image widget":"وێدجیتی وێنە","In line":"","Side image":"لای وێنە","Full size image":"پڕ بەقەبارەی وێنە","Left aligned image":"ڕیزکردنی وێنە بۆ لای چەپ","Centered image":"ناوەڕاستکراوی وێنە","Right aligned image":"ڕیزکردنی وێنە بۆ لای ڕاست","Change image text alternative":"گۆڕینی جێگروەی تێکیسی وێنە","Text alternative":"جێگرەوەی تێکست","Enter image caption":"سەردێڕی وێنە دابنێ","Insert image":"وێنە دابنێ","Replace image":"","Upload from computer":"","Replace from computer":"","Upload image from computer":"","Image from computer":"","From computer":"","Replace image from computer":"","Upload failed":"بارکردنەکە سەرنەکەووت","You have no image upload permissions.":"","Image toolbar":"تووڵامرازی وێنە","Resize image":"","Resize image to %0":"","Resize image to the original size":"","Resize image (in %0)":"","Custom image size":"","Image resize list":"","Insert image via URL":"","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"","Caption for the image":"","Caption for image: %0":"","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"","Text Alternative":""}}};
e[ 'ku' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ku' ].dictionary = Object.assign( e[ 'ku' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ku' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
