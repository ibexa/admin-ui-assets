/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sq' ]: translations } = {"sq":{"dictionary":{"Unlink":"Largo nyjën","Link":"Shto nyjën","Link URL":"Nyja e URL-së","Link URL must not be empty.":"","Link image":"Foto e nyjes","Link properties":"","Edit link":"Redakto nyjën","Open link in new tab":"Hap nyjën në faqe të re","Open in a new tab":"Hape në një fletë të re","Downloadable":"E shkarkueshme","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'sq' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sq' ].dictionary = Object.assign( e[ 'sq' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sq' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
