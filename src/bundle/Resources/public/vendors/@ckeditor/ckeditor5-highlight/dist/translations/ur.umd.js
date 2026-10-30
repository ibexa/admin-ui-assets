/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ur' ]: translations } = {"ur":{"dictionary":{"Yellow marker":"پیلا نشان","Green marker":"سبز نشان","Pink marker":"گلابی نشان","Blue marker":"نیلا نشان","Red pen":"سرخ قلم","Green pen":"سبز قلم","Remove highlight":"غیر نمایاں کریں","Highlight":"نمایاں","Text highlight toolbar":"خانہ آلات برائے نمایاں متن"}}};
e[ 'ur' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ur' ].dictionary = Object.assign( e[ 'ur' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ur' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
