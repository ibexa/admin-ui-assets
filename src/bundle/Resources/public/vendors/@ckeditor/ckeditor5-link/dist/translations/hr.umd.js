/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hr' ]: translations } = {"hr":{"dictionary":{"Unlink":"Ukloni vezu","Link":"Veza","Link URL":"URL veze","Link URL must not be empty.":"","Link image":"URL slike","Link properties":"","Edit link":"Uredi vezu","Open link in new tab":"Otvori vezu u novoj kartici","Open in a new tab":"Otvori u novoj kartici","Downloadable":"Moguće preuzeti","Create link":"","Move out of a link":"","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'hr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hr' ].dictionary = Object.assign( e[ 'hr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
