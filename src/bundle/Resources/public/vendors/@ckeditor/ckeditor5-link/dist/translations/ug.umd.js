/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ug' ]: translations } = {"ug":{"dictionary":{"Unlink":"ئۇلانمىنى ئۈزۈش","Link":"ئۇلانما","Link URL":"ئۇلاش ئادىرسى","Link URL must not be empty.":"ئۇلانما تور ئادرېسى بوش قالدۇرۇلمايدۇ.","Link image":"ئۇلانما سۈرەت","Link properties":"","Edit link":"ئۇلانما تەھرىر","Open link in new tab":"ئۇلانمىنى يېڭى بەتكۈچتە ئاچ","Open in a new tab":"يېڭى بەتكۈچتە ئاچ","Downloadable":"چۈشۈرۈشچان","Create link":"ئۇلانما قۇر","Move out of a link":"ئۇلانمىنى چىقىرىۋەت","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'ug' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ug' ].dictionary = Object.assign( e[ 'ug' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ug' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
