/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-gb' ]: translations } = {"en-gb":{"dictionary":{"Font Size":"Font Size","Tiny":"Tiny","Small":"Small","Big":"Big","Huge":"Huge","Font Family":"Font Family","Default":"Default","Font Color":"Font Colour","Font Background Color":"Font Background Colour","Document colors":"Document colours"}}};
e[ 'en-gb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-gb' ].dictionary = Object.assign( e[ 'en-gb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'en-gb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
