/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'oc' ]: translations } = {"oc":{"dictionary":{"Copy selected content":"","Paste content":"","Paste content as plain text":""}}};
e[ 'oc' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'oc' ].dictionary = Object.assign( e[ 'oc' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'oc' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
