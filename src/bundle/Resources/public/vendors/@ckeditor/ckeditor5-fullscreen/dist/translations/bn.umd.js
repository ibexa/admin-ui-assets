/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bn' ]: translations } = {"bn":{"dictionary":{"Enter fullscreen mode":"ফুলস্ক্রীন মোডে প্রবেশ করুন","Leave fullscreen mode":"ফুলস্ক্রিন মোড ছেড়ে যান","Fullscreen mode":"ফুলস্ক্রিন মোড","Toggle fullscreen mode":"ফুলস্ক্রিন মোড টগল করুন","Document outline":"ডকুমেন্ট আউটলাইন","Connected users":"সংযুক্ত ব্যবহারকারী","Show left sidebar":"বাম সাইডবার দেখান","Hide left sidebar":"বাম সাইডবার লুকান","Toggle sidebar":"সাইডবার টগল করুন"}}};
e[ 'bn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bn' ].dictionary = Object.assign( e[ 'bn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
