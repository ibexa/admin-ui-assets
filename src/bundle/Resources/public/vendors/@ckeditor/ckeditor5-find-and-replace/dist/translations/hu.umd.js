/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hu' ]: { dictionary, getPluralForm } } = {"hu":{"dictionary":{"Find and replace":"Keresés és csere","Find in text…":"Keresés szövegben...","Find":"Keresés","Previous result":"Előző találat","Next result":"Következő találat","Replace":"Csere","Replace all":"Mind cserél","Match case":"Nagybetű érzékeny","Whole words only":"Csak teljes szavak","Replace with…":"Csere erre...","Text to find must not be empty.":"A keresendő szöveg nem lehet üres.","Tip: Find some text first in order to replace it.":"Tipp: Először keressen egy szöveget, hogy lecserélhesse.","Advanced options":"Speciális beállítások","Find in the document":"Keresés a dokumentumban"},getPluralForm(n){return (n != 1);}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, dictionary );
e[ 'hu' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
