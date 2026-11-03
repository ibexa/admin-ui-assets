/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-gb' ]: translations } = {"en-gb":{"dictionary":{"Unlink":"Unlink","Link":"Link","Link URL":"Link URL","Link URL must not be empty.":"","Link image":"","Link properties":"Link properties","Edit link":"Edit link","Open link in new tab":"Open link in new tab","Open in a new tab":"Open in a new tab","Downloadable":"Downloadable","Create link":"","Move out of a link":"","Displayed text":"Displayed text","No links available":"No links available","This link has no URL":"This link has no URL"}}};
e[ 'en-gb' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-gb' ].dictionary = Object.assign( e[ 'en-gb' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'en-gb' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
