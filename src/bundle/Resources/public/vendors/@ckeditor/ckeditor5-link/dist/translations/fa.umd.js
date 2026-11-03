/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fa' ]: translations } = {"fa":{"dictionary":{"Unlink":"لغو پیوند","Link":"پیوند","Link URL":"نشانی اینترنتی پیوند","Link URL must not be empty.":"","Link image":"اتصال پیوند به تصویر","Link properties":"","Edit link":"ویرایش پیوند","Open link in new tab":"باز کردن پیوند در برگه جدید","Open in a new tab":"بازکردن در برگه جدید","Downloadable":"قابل بارگیری","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'fa' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fa' ].dictionary = Object.assign( e[ 'fa' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fa' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
