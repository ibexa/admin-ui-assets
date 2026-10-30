/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hi' ]: translations } = {"hi":{"dictionary":{"Copy selected content":"सेलेक्ट किए गए कॉन्टेंट को कॉपी करें","Paste content":"कॉन्टेंट पेस्ट करें","Paste content as plain text":"कॉन्टेंट को प्लेन टेक्स्ट के रूप में पेस्ट करें"}}};
e[ 'hi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hi' ].dictionary = Object.assign( e[ 'hi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
