/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'kn' ]: translations } = {"kn":{"dictionary":{"Insert HTML":"","HTML snippet":"","Paste raw HTML here...":"","Edit source":"","Save changes":"","No preview available":"","Empty snippet content":""}}};
e[ 'kn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'kn' ].dictionary = Object.assign( e[ 'kn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'kn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
