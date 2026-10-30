/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hy' ]: translations } = {"hy":{"dictionary":{"Font Size":"","Tiny":"","Small":"","Big":"","Huge":"","Font Family":"","Default":"","Font Color":"","Font Background Color":"","Document colors":""}}};
e[ 'hy' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hy' ].dictionary = Object.assign( e[ 'hy' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hy' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
