/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-gb' ]: translations } = {"en-gb":{"dictionary":{"Yellow marker":"Yellow marker","Green marker":"Green marker","Pink marker":"Pink marker","Blue marker":"Blue marker","Red pen":"Red pen","Green pen":"Green pen","Remove highlight":"Remove highlight","Highlight":"Highlight","Text highlight toolbar":""}}};
e[ 'en-gb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-gb' ].dictionary = Object.assign( e[ 'en-gb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'en-gb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
