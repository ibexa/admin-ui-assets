/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-au' ]: translations } = {"en-au":{"dictionary":{"Enter fullscreen mode":"Enter fullscreen mode","Leave fullscreen mode":"Leave fullscreen mode","Fullscreen mode":"Fullscreen mode","Toggle fullscreen mode":"Toggle fullscreen mode","Document outline":"Document outline","Connected users":"Connected users","Show left sidebar":"Show left sidebar","Hide left sidebar":"Hide left sidebar","Toggle sidebar":"Toggle sidebar"}}};
e[ 'en-au' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-au' ].dictionary = Object.assign( e[ 'en-au' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'en-au' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
