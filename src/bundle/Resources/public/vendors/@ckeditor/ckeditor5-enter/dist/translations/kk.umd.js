/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'kk' ]: { dictionary, getPluralForm } } = {"kk":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"","Insert a hard break (a new paragraph)":""},getPluralForm(n){return (n != 1);}}};
e[ 'kk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'kk' ].dictionary = Object.assign( e[ 'kk' ].dictionary, dictionary );
e[ 'kk' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
