/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'lt' ]: translations } = {"lt":{"dictionary":{"Bookmark":"Adresyno įrašas","Edit bookmark":"Redaguoti adresyno įrašą","Remove bookmark":"Pašalinti adresyno įrašą","Bookmark name":"Adresyno įrašo pavadinimas","Enter the bookmark name without spaces.":"Įveskite adresyno įrašo pavadinimą be tarpų.","Bookmark must not be empty.":"Adresyno įrašas negali būti tuščias.","Bookmark name cannot contain space characters.":"Adresyno įrašo pavadinimas negali turėti specialiųjų ženklų.","Bookmark name already exists.":"Toks adresyno įrašo pavadinimas jau yra naudojamas.","bookmark widget":"adresyno įrašo valdiklis","Bookmark toolbar":"Adresyno įrašų įrankių juosta","Bookmarks":"Adresyno įrašai","No bookmarks available.":"Nėra jokių adresyno įrašų","Scroll to bookmark":"Slinkite prie žymeklio"}}};
e[ 'lt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'lt' ].dictionary = Object.assign( e[ 'lt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'lt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
