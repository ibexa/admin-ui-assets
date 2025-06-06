/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'hu' ]: { dictionary, getPluralForm } } = {"hu":{"dictionary":{"Emoji":"Emoji","Show all emoji...":"Minden emoji megjelenítése...","Find an emoji (min. 2 characters)":"Emoji keresése (min. 2 karakter)","No emojis were found matching \"%0\".":"Nem található emoji „%0” kifejezésre.","Keep on typing to see the emoji.":"Írjon tovább az emoji megjelenéséhez.","The query must contain at least two characters.":"A kérés legalább 2 karaktert kell tartalmazzon.","Smileys & Expressions":"Smiley-k és arckifejezések","Gestures & People":"Gesztusok és emberek","Animals & Nature":"Állatok és természet","Food & Drinks":"Étel és ital","Travel & Places":"Utazás és helyek","Activities":"Tevékenységek","Objects":"Tárgyak","Symbols":"Jelek","Flags":"Zászlók","Select skin tone":"Válasszon bőrszínt","Default skin tone":"Alapértelmezett bőrszín","Light skin tone":"Világos bőrszín","Medium Light skin tone":"Közepesen világos bőrszín","Medium skin tone":"Közepes bőrszín","Medium Dark skin tone":"Közepesen sötét bőrszín","Dark skin tone":"Sötét bőrszín","Emoji picker":"Emojiválasztó"},getPluralForm(n){return (n != 1);}}};
e[ 'hu' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'hu' ].dictionary = Object.assign( e[ 'hu' ].dictionary, dictionary );
e[ 'hu' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
