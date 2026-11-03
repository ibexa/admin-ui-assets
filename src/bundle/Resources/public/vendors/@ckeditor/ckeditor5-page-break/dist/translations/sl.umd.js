/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sl' ]: translations } = {"sl":{"dictionary":{"Page break":""}}};
e[ 'sl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sl' ].dictionary = Object.assign( e[ 'sl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
