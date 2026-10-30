/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Insert image or file":"إدراج صورة أو ملف","Could not obtain resized image URL.":"تعذر الحصول على عنوان URL الخاص بالصورة التي غُيّرَ حجمُها","Selecting resized image failed":"فشلت عملية تحديد الصورة التي غُيّرَ حجمها","Could not insert image at the current position.":"تعذر إدراج الصورة في الموضع الحالي.","Inserting image failed":"فشلت عملية إدراج الصورة"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
