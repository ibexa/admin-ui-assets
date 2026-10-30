/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'es-co' ]: translations } = {"es-co":{"dictionary":{"Emoji":"","Show all emoji...":"","Find an emoji (min. 2 characters)":"","No emojis were found matching \"%0\".":"","Keep on typing to see the emoji.":"","The query must contain at least two characters.":"","Smileys & Expressions":"","Gestures & People":"","Animals & Nature":"","Food & Drinks":"","Travel & Places":"","Activities":"","Objects":"","Symbols":"","Flags":"","Select skin tone":"","Default skin tone":"","Light skin tone":"","Medium Light skin tone":"","Medium skin tone":"","Medium Dark skin tone":"","Dark skin tone":"","Emoji picker":""}}};
e[ 'es-co' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'es-co' ].dictionary = Object.assign( e[ 'es-co' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'es-co' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
