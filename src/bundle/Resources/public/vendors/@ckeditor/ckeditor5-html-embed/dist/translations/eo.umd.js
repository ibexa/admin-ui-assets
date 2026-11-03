/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'eo' ]: translations } = {"eo":{"dictionary":{"Insert HTML":"","HTML snippet":"","Paste raw HTML here...":"","Edit source":"","Save changes":"","No preview available":"","Empty snippet content":""}}};
e[ 'eo' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'eo' ].dictionary = Object.assign( e[ 'eo' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'eo' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
