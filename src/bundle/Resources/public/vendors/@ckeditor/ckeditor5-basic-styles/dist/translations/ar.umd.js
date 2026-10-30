/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Bold":"عريض","Italic":"مائل","Underline":"تحته خط","Code":"شفرة برمجية","Strikethrough":"يتوسطه خط","Subscript":"حرف منخفض","Superscript":"حرف مرتفع","Italic text":"نص مائل","Move out of an inline code style":"ابتعدْ عن نمط التعليمات البرمجية المضمّنة","Bold text":"نص غامق","Underline text":"تسطير النص","Strikethrough text":"توسيط الخط في النص"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
