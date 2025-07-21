/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fa' ]: { dictionary, getPluralForm } } = {"fa":{"dictionary":{"Yellow marker":"نشانگر زرد","Green marker":"نشانگر سبز","Pink marker":"نشانگر صورتی","Blue marker":"نشانگر آبی","Red pen":"قلم قرمز","Green pen":"قلم سبز","Remove highlight":"حذف برجسته","Highlight":"برجسته","Text highlight toolbar":"نوارابزار برجستگی متن"},getPluralForm(n){return 0;}}};
e[ 'fa' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fa' ].dictionary = Object.assign( e[ 'fa' ].dictionary, dictionary );
e[ 'fa' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
