/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'eu' ]: translations } = {"eu":{"dictionary":{"Saving changes":""}}};
e[ 'eu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'eu' ].dictionary = Object.assign( e[ 'eu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'eu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
