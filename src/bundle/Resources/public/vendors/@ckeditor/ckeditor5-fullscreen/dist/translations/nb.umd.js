/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nb' ]: translations } = {"nb":{"dictionary":{"Enter fullscreen mode":"","Leave fullscreen mode":"","Fullscreen mode":"","Toggle fullscreen mode":"","Document outline":"","Connected users":"","Show left sidebar":"","Hide left sidebar":"","Toggle sidebar":""}}};
e[ 'nb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nb' ].dictionary = Object.assign( e[ 'nb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
