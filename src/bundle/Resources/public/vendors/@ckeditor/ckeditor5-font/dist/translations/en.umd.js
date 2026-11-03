/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en' ]: translations } = {"en":{"dictionary":{"Font Size":"Font Size","Tiny":"Tiny","Small":"Small","Big":"Big","Huge":"Huge","Font Family":"Font Family","Default":"Default","Font Color":"Font Color","Font Background Color":"Font Background Color","Document colors":"Document colors"}}};
e[ 'en' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en' ].dictionary = Object.assign( e[ 'en' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'en' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
