/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'af' ]: { dictionary, getPluralForm } } = {"af":{"dictionary":{"Enter fullscreen mode":"","Leave fullscreen mode":"","Fullscreen mode":"","Toggle fullscreen mode":"","Document outline":"","Connected users":""},getPluralForm(n){return (n != 1);}}};
e[ 'af' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'af' ].dictionary = Object.assign( e[ 'af' ].dictionary, dictionary );
e[ 'af' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
