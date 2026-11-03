/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Unlink":"إلغاء الرابط","Link":"رابط","Link URL":"رابط عنوان","Link URL must not be empty.":"يجب ألا يكون عنوان الرابط فارغاً.","Link image":"ربط الصورة","Link properties":"خصائص الرابط","Edit link":"تحرير الرابط","Open link in new tab":"فتح الرابط في تبويب جديد","Open in a new tab":"فتح في تبويب جديد","Downloadable":"يمكن تنزيله","Create link":"قمْ بإنشاء رابط","Move out of a link":"ابتعدْ عن الرابط","Displayed text":"النص المعروض","No links available":"لا توجد روابط متاحة","This link has no URL":"هذا الرابط ليس له عنوان URL"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
