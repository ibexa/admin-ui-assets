/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ur' ]: translations } = {"ur":{"dictionary":{"Unlink":"ربط حذف کریں","Link":"ربط","Link URL":"ربط کا یو آر ایل","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"ربط کی تدوین","Open link in new tab":"نئے ٹیب میں کھولیں","Open in a new tab":"نئی ٹیب کھولیں","Downloadable":"ڈاؤنلوڈ ہو سکتا ہے","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'ur' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ur' ].dictionary = Object.assign( e[ 'ur' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ur' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
