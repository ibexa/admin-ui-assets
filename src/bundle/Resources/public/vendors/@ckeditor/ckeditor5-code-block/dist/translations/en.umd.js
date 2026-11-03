/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en' ]: translations } = {"en":{"dictionary":{"Insert code block":"Insert code block","Plain text":"Plain text","Leaving %0 code snippet":"Leaving %0 code snippet","Entering %0 code snippet":"Entering %0 code snippet","Entering code snippet":"Entering code snippet","Leaving code snippet":"Leaving code snippet","Code block":"Code block"}}};
e[ 'en' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en' ].dictionary = Object.assign( e[ 'en' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'en' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
