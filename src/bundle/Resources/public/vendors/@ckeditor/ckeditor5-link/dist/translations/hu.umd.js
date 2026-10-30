/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hu' ]: translations } = {"hu":{"dictionary":{"Unlink":"Link eltávolítása","Link":"Link","Link URL":"URL link","Link URL must not be empty.":"A link URL-címe nem lehet üres.","Link image":"Hivatkozás","Link properties":"Link tulajdonságai","Edit link":"Link szerkesztése","Open link in new tab":"Link megnyitása új ablakban","Open in a new tab":"Megnyitás új lapon","Downloadable":"Letölthető","Create link":"Link létrehozása","Move out of a link":"Kilépés egy linkből","Displayed text":"Megjelenő szöveg","No links available":"Nincs elérhető link","This link has no URL":"Ennek a hivatkozásnak nincs URL-címe"}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'hu' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
