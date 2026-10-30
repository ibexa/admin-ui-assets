/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ast' ]: translations } = {"ast":{"dictionary":{"Insert code block":"","Plain text":"","Leaving %0 code snippet":"","Entering %0 code snippet":"","Entering code snippet":"","Leaving code snippet":"","Code block":""}}};
e[ 'ast' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ast' ].dictionary = Object.assign( e[ 'ast' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ast' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
