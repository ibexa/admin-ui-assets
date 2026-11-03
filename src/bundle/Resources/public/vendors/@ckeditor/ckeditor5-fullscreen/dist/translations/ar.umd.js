/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ar' ]: translations } = {"ar":{"dictionary":{"Enter fullscreen mode":"الدخول في وضع ملء الشاشة","Leave fullscreen mode":"مغادرة وضع ملء الشاشة","Fullscreen mode":"وضع ملء الشاشة","Toggle fullscreen mode":"تبديل وضع ملء الشاشة","Document outline":"مخطط المستند","Connected users":"المستخدمون المتصلون","Show left sidebar":"إظهار الشريط الجانبي الأيسر","Hide left sidebar":"إخفاء الشريط الجانبي الأيسر","Toggle sidebar":"تبديل الشريط الجانبي"}}};
e[ 'ar' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ar' ].dictionary = Object.assign( e[ 'ar' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ar' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
