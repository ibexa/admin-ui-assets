/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: translations } = {"uz":{"dictionary":{"Unlink":"Havolani olib tashlash","Link":"Havola","Link URL":"\"Havola URL","Link URL must not be empty.":"","Link image":"Rasmga havola","Link properties":"","Edit link":"Havolani tahrirlash","Open link in new tab":"Havolani yangi oynada ochish","Open in a new tab":"Yangi oynada oching","Downloadable":"Yuklab olinadigan","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uz' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
