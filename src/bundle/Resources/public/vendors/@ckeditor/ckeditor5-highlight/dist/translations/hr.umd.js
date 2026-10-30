/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hr' ]: translations } = {"hr":{"dictionary":{"Yellow marker":"Žuti marker","Green marker":"Zeleni marker","Pink marker":"Rozi marker","Blue marker":"Plavi marker","Red pen":"Crveno pero","Green pen":"Zeleno pero","Remove highlight":"Ukloni isticanje","Highlight":"Istakni","Text highlight toolbar":"Traka za isticanje teksta"}}};
e[ 'hr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hr' ].dictionary = Object.assign( e[ 'hr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
