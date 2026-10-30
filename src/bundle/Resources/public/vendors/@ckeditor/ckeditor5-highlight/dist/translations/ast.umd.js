/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ast' ]: translations } = {"ast":{"dictionary":{"Yellow marker":"","Green marker":"","Pink marker":"","Blue marker":"","Red pen":"","Green pen":"","Remove highlight":"","Highlight":"","Text highlight toolbar":""}}};
e[ 'ast' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ast' ].dictionary = Object.assign( e[ 'ast' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ast' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
