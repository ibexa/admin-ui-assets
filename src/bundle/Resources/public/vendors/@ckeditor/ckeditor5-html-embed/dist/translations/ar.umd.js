/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Insert HTML":"إدراج HTML","HTML snippet":"قصاصة برمجية بلغة HTML","Paste raw HTML here...":"ألصق رمز HTML الأولي هنا...","Edit source":"تحرير المصدر","Save changes":"حفظ التغييرات","No preview available":"المعاينة غير متاحة","Empty snippet content":"محتوى القصاصة فارغ"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
