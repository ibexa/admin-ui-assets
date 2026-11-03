/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'nb' ]: translations } = {"nb":{"dictionary":{"Unlink":"Fjern lenke","Link":"Lenke","Link URL":"URL for lenke","Link URL must not be empty.":"","Link image":"","Link properties":"","Edit link":"Rediger lenke","Open link in new tab":"Åpne lenke i ny fane","Open in a new tab":"","Downloadable":"","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'nb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'nb' ].dictionary = Object.assign( e[ 'nb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'nb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
