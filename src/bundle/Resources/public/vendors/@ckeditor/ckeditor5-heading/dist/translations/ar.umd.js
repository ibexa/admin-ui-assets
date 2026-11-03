/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Heading":"عنوان","Choose heading":"اختر عنوان","Heading 1":"عنوان 1","Heading 2":"عنوان 2","Heading 3":"عنوان 3","Heading 4":"عنوان 4","Heading 5":"عنوان 5","Heading 6":"عنوان 6","Type your title":"أدخل العنوان","Type or paste your content here.":"أكتب المحتوى أو ألصقه هنا."}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
