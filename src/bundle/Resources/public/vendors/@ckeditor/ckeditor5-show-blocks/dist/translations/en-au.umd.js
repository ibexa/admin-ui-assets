/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-au' ]: { dictionary, getPluralForm } } = {"en-au":{"dictionary":{"Show blocks":""},getPluralForm(n){return (n != 1);}}};
e[ 'en-au' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-au' ].dictionary = Object.assign( e[ 'en-au' ].dictionary, dictionary );
e[ 'en-au' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
