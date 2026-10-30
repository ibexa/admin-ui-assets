/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hi' ]: translations } = {"hi":{"dictionary":{"Styles":"स्टाइल्स","Multiple styles":"कई स्टाइल्स","Block styles":"ब्लॉक स्टाइल्स","Text styles":"टेक्स्ट स्टाइल्स"}}};
e[ 'hi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hi' ].dictionary = Object.assign( e[ 'hi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
