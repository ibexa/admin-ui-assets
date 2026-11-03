/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ne' ]: translations } = {"ne":{"dictionary":{"Unlink":"अनलिङ्क गर्नुहोस्","Link":"लिङ्क","Link URL":"लिङ्क यूआरएल","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"लिङ्क सम्पादन गर्नुहोस्","Open link in new tab":"नयाँ ट्याबमा लिङ्क खोल्नुहोस्","Open in a new tab":"नयाँ ट्याबमा खोल्न","Downloadable":"डाउनलोड योग्य","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'ne' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ne' ].dictionary = Object.assign( e[ 'ne' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ne' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
