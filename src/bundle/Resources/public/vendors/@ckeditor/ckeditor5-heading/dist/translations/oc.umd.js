/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'oc' ]: translations } = {"oc":{"dictionary":{"Heading":"","Choose heading":"","Heading 1":"","Heading 2":"","Heading 3":"","Heading 4":"","Heading 5":"","Heading 6":"","Type your title":"","Type or paste your content here.":""}}};
e[ 'oc' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'oc' ].dictionary = Object.assign( e[ 'oc' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'oc' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
