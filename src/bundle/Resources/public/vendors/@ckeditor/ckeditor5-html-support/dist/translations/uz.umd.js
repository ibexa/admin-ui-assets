/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: { dictionary, getPluralForm } } = {"uz":{"dictionary":{"HTML object":""},getPluralForm(n){return (n > 1);}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, dictionary );
e[ 'uz' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
