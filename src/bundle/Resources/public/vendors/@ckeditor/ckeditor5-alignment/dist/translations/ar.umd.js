/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Align left":"محاذاة لليسار","Align right":"محاذاة لليمين","Align center":"محاذاة في المنتصف","Justify":"ضبط","Text alignment":"محاذاة النص","Text alignment toolbar":"شريط أدوات محاذاة النص"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
