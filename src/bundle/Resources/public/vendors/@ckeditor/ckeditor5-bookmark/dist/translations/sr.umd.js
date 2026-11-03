/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Bookmark":"Obeleživač","Edit bookmark":"Uredi obeleživač","Remove bookmark":"Ukloni obeleživač","Bookmark name":"Naziv obeleživača","Enter the bookmark name without spaces.":"Unesite naziv obeleživača bez razmaka.","Bookmark must not be empty.":"Naziv obeleživača ne sme biti prazan.","Bookmark name cannot contain space characters.":"Naziv obeleživača ne može da sadrži znakove sa razmakom.","Bookmark name already exists.":"Naziv obeleživača već postoji.","bookmark widget":"vidžet obeleživača","Bookmark toolbar":"Traka sa alatkama za obeleživače","Bookmarks":"Obeleživači","No bookmarks available.":"Nema dostupnih obeleživača.","Scroll to bookmark":"Dođite do obeleživača"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
