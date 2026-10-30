/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'oc' ]: translations } = {"oc":{"dictionary":{"Align left":"","Align right":"","Align center":"","Justify":"","Text alignment":"","Text alignment toolbar":""}}};
e[ 'oc' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'oc' ].dictionary = Object.assign( e[ 'oc' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'oc' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
