/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ug' ]: translations } = {"ug":{"dictionary":{"Insert image or file":"رەسىم ياكى ھۆججەت قىستۇر","Could not obtain resized image URL.":"چوڭلۇقى تەڭشەلگەن سۈرەتنىڭ تور ئادرېسىغا ئېرىشەلمىدى","Selecting resized image failed":"چوڭلۇقى تەڭشەلگن سۈرەتنى تاللىيالمىدى","Could not insert image at the current position.":"نۆۋەتتە ئورۇنغا سۈرەتنى قىستۇرالمايدۇ.","Inserting image failed":"سۈرەت قىستۇرالمىدى"}}};
e[ 'ug' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ug' ].dictionary = Object.assign( e[ 'ug' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ug' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
