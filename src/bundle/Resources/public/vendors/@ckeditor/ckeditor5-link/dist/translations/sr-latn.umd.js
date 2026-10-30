/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr-latn' ]: translations } = {"sr-latn":{"dictionary":{"Unlink":"Оtkloni link","Link":"Link","Link URL":"URL link","Link URL must not be empty.":"URL linka ne sme biti prazan.","Link image":"Link slike","Link properties":"","Edit link":"Ispravi link","Open link in new tab":"Otvori link u novom prozoru","Open in a new tab":"Otvori u novoj kartici","Downloadable":"Moguće preuzimanje","Create link":"Kreirajte vezu","Move out of a link":"Pomerite se sa veze","Displayed text":"","No links available":"","This link has no URL":""}}};
e[ 'sr-latn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr-latn' ].dictionary = Object.assign( e[ 'sr-latn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr-latn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
