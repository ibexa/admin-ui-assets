/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es-co' ]: translations } = {"es-co":{"dictionary":{"Unlink":"","Link":"","Link URL":"","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"","Open link in new tab":"","Open in a new tab":"","Downloadable":"","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'es-co' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es-co' ].dictionary = Object.assign( e[ 'es-co' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es-co' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
