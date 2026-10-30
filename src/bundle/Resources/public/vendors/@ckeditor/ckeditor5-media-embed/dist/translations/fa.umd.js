/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fa' ]: translations } = {"fa":{"dictionary":{"media widget":"ویجت رسانه","Media URL":"آدرس اینترنتی رسانه","Paste the media URL in the input.":"آدرس رسانه را در ورودی قرار دهید","Tip: Paste the URL into the content to embed faster.":"نکته : آدرس را در محتوا قراردهید تا سریع تر جاسازی شود","The URL must not be empty.":"آدرس اینترنتی URL نباید خالی باشد.","This media URL is not supported.":"این آدرس اینترنتی رسانه پشتیبانی نمی‌شود","Insert media":"وارد کردن رسانه","Media embed":"","Media":"","Media toolbar":"نوارابزار رسانه","Open media in new tab":"","Left aligned media":"","Centered media":"","Right aligned media":"","Resize media":"","Resize media to %0":"","Resize media to the original size":"","Resize media (in %0)":"","Custom media size":"","Media resize list":"","Media Resize":""}}};
e[ 'fa' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fa' ].dictionary = Object.assign( e[ 'fa' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fa' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
