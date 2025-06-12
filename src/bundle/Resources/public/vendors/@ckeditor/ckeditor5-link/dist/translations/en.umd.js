/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en' ]: { dictionary, getPluralForm } } = {"en":{"dictionary":{"Unlink":"Unlink","Link":"Link","Link URL":"Link URL","Link URL must not be empty.":"Link URL must not be empty.","Link image":"Link image","Edit link":"Edit link","Open link in new tab":"Open link in new tab","Open in a new tab":"Open in a new tab","Downloadable":"Downloadable","Create link":"Create link","Move out of a link":"Move out of a link","Link properties":"Link properties","Displayed text":"Displayed text","No links available":"No links available"},getPluralForm(n){return (n != 1);}}};
e[ 'en' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en' ].dictionary = Object.assign( e[ 'en' ].dictionary, dictionary );
e[ 'en' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
