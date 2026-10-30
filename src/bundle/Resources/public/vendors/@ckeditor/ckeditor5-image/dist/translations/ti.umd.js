/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ti' ]: translations } = {"ti":{"dictionary":{"image widget":"","In line":"","Side image":"","Full size image":"","Left aligned image":"","Centered image":"","Right aligned image":"","Change image text alternative":"","Text alternative":"","Enter image caption":"","Insert image":"ስእሊ ኣእትው","Replace image":"ስእሊ ተክእ","Upload from computer":"ካብ ኮምፕዩተር ኣደይብ","Replace from computer":"ካብ ኮምፕዩተር ተክእ","Upload image from computer":"ንስእሊ ካብ ኮምፕዩተር ኣደይብ ","Image from computer":"ስእሊ ካብ ኮምፕዩተር","From computer":"","Replace image from computer":"ንስእሊ ካብ ኮምፕዩተር ተክእ ","Upload failed":"ምድያብ ፈሺሉ","You have no image upload permissions.":"","Image toolbar":"መኸወኒ ስእሊ","Resize image":"መጠን ስእሊ ቀይር","Resize image to %0":"","Resize image to the original size":"","Resize image (in %0)":"","Custom image size":"","Image resize list":"","Insert image via URL":"","Insert via URL":"","Image via URL":"","Via URL":"","Update image URL":"","Caption for the image":"","Caption for image: %0":"","Uploading image":"","Image upload complete":"","Error during image upload":"","Image":"","Image Resize":"","Text Alternative":""}}};
e[ 'ti' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ti' ].dictionary = Object.assign( e[ 'ti' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ti' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
