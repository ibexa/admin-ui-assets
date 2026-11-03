/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: translations } = {"ro":{"dictionary":{"Yellow marker":"Evidențiator galben","Green marker":"Evidențiator verde","Pink marker":"Evidențiator roz","Blue marker":"Evidențiator albastru","Red pen":"Pix roșu","Green pen":"Pix verde","Remove highlight":"Șterge evidențiere text","Highlight":"Evidențiere text","Text highlight toolbar":"Bară evidențiere text"}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ro' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
