/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'si' ]: translations } = {"si":{"dictionary":{"HTML object":""}}};
e[ 'si' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'si' ].dictionary = Object.assign( e[ 'si' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'si' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
