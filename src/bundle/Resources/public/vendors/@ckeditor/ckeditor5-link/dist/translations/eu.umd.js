/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'eu' ]: translations } = {"eu":{"dictionary":{"Unlink":"Desestekatu","Link":"Esteka","Link URL":"Estekaren URLa","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"","Open link in new tab":"","Open in a new tab":"","Downloadable":"","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'eu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'eu' ].dictionary = Object.assign( e[ 'eu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'eu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
