/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"media widget":"أداة الوسائط","Media URL":"عنوان URL الوسائط","Paste the media URL in the input.":"ألصق عنوان URL الوسائط في موضع الإدخال.","Tip: Paste the URL into the content to embed faster.":"نصيحة: ألصق عنوان URL داخل المحتوى؛ لتسريع عملية التضمين.","The URL must not be empty.":"لا يمكن ترك بيان عنوان URL فارغاً.","This media URL is not supported.":"عنوان URL الوسائط هذا غير مدعوم.","Insert media":"أدخل الوسائط","Media embed":"تضمين الوسائط","Media":"وسائط","Media toolbar":"شريط أدوات الوسائط","Open media in new tab":"فتح الوسائط في علامة تبويب جديدة","Left aligned media":"وسائط مُحاذية لليسار","Centered media":"وسائط مُوسّطة","Right aligned media":"وسائط مُحاذية لليمين","Resize media":"تغيير حجم الوسائط","Resize media to %0":"تغيير حجم الوسائط إلى %0","Resize media to the original size":"تغيير حجم الوسائط إلى حجمها الأصلي","Resize media (in %0)":"تغيير حجم الوسائط (في %0)","Custom media size":"حجم مخصص للوسائط","Media resize list":"قائمة تغيير حجم الوسائط","Media Resize":"تغيير حجم الوسائط"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
