/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ast' ]: { dictionary, getPluralForm } } = {"ast":{"dictionary":{"Yellow marker":"","Green marker":"","Pink marker":"","Blue marker":"","Red pen":"","Green pen":"","Remove highlight":"","Highlight":"","Text highlight toolbar":""},getPluralForm(n){return (n != 1);}}};
e[ 'ast' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ast' ].dictionary = Object.assign( e[ 'ast' ].dictionary, dictionary );
e[ 'ast' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
