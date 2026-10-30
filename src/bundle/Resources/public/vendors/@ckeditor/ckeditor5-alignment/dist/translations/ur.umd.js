/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ur' ]: translations } = {"ur":{"dictionary":{"Align left":"بائیں سیدھ","Align right":"دائیں سیدھ","Align center":"درمیانی سیدھ","Justify":"برابر سیدھ","Text alignment":"متن کی سیدھ","Text alignment toolbar":"خانہ آلات برائے سیدھ"}}};
e[ 'ur' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ur' ].dictionary = Object.assign( e[ 'ur' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ur' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
