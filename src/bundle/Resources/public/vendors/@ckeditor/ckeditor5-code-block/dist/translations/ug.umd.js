/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ug' ]: translations } = {"ug":{"dictionary":{"Insert code block":"كود بۆلىكى قىستۇر","Plain text":"ساپ تېكىست","Leaving %0 code snippet":"","Entering %0 code snippet":"","Entering code snippet":"","Leaving code snippet":"","Code block":""}}};
e[ 'ug' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ug' ].dictionary = Object.assign( e[ 'ug' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ug' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
