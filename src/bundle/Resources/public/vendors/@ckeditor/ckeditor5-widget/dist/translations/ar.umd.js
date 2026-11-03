/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Widget toolbar":"شريط أدوات الواجهة","Insert paragraph before block":"إدراج فقرة قبل الكتلة","Insert paragraph after block":"إدراج فقرة بعد الكتلة","Press Enter to type after or press Shift + Enter to type before the widget":"اضغط على Enter للكتابة بعد ذلك أو اضغط على Shift + Enter للكتابة قبل الأداة","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"ضغطة المفاتيح التي يمكن استخدامها عند اختيار الأداة (على سبيل المثال: الصورة والجدول وما إلى ذلك)","Insert a new paragraph directly after a widget":"قم بإدراج فقرة جديدة مباشرةً بعد الأداة","Insert a new paragraph directly before a widget":"قم بإدراج فقرة جديدة مباشرةً قبل الأداة","Move the caret to allow typing directly before a widget":"حرّكْ علامة الإقحام للسماح بالكتابة مباشرةً قبل الأداة","Move the caret to allow typing directly after a widget":"حرّكْ علامة الإقحام للسماح بالكتابة مباشرةً بعد الأداة","Move focus from an editable area back to the parent widget":"انقل التركيز من منطقة قابلة للتحرير لتعيده إلى الأداة الأصلية"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
