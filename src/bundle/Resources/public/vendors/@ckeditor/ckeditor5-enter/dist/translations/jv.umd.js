/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'jv' ]: translations } = {"jv":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"","Insert a hard break (a new paragraph)":""}}};
e[ 'jv' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'jv' ].dictionary = Object.assign( e[ 'jv' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'jv' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
