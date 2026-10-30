/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fa' ]: translations } = {"fa":{"dictionary":{"Styles":"","Multiple styles":"","Block styles":"","Text styles":""}}};
e[ 'fa' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fa' ].dictionary = Object.assign( e[ 'fa' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fa' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
