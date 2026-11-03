/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fa' ]: translations } = {"fa":{"dictionary":{"image widget":"ابزاره تصویر","In line":"","Side image":"تصویر جانبی","Full size image":"تصویر در اندازه کامل","Left aligned image":"تصویر تراز شده چپ","Centered image":"تصویر در وسط","Right aligned image":"تصویر تراز شده راست","Change image text alternative":"تغییر متن جایگزین تصویر","Text alternative":"متن جایگزین","Enter image caption":"عنوان تصویر را وارد کنید","Insert image":"قرار دادن تصویر","Replace image":"","Upload from computer":"","Replace from computer":"","Upload image from computer":"","Image from computer":"","From computer":"","Replace image from computer":"","Upload failed":"آپلود ناموفق بود","You have no image upload permissions.":"","Image toolbar":"نوارابزار تصویر","Resize image":"","Resize image to %0":"","Resize image to the original size":"","Resize image (in %0)":"","Custom image size":"","Image resize list":"","Insert image via URL":"","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"","Caption for the image":"","Caption for image: %0":"","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"","Text Alternative":""}}};
e[ 'fa' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fa' ].dictionary = Object.assign( e[ 'fa' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fa' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
