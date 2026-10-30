/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hi' ]: translations } = {"hi":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"एक सॉफ़्ट ब्रेक इंसर्ट करें (एक <code>&lt;br&gt;</code> एलिमेंट)","Insert a hard break (a new paragraph)":"एक हार्ड ब्रेक इंसर्ट करें (एक नया पैराग्राफ़)"}}};
e[ 'hi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hi' ].dictionary = Object.assign( e[ 'hi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
