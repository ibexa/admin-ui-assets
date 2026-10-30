/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'eo' ]: translations } = {"eo":{"dictionary":{"Unlink":"Malligi","Link":"Ligilo","Link URL":"URL de la ligilo","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"","Open link in new tab":"","Open in a new tab":"","Downloadable":"","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'eo' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'eo' ].dictionary = Object.assign( e[ 'eo' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'eo' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
