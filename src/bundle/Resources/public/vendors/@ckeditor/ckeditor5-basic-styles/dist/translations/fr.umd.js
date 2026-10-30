/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'fr' ]: translations } = {"fr":{"dictionary":{"Bold":"Gras","Italic":"Italique","Underline":"Souligné","Code":"Code","Strikethrough":"Barré","Subscript":"Indice","Superscript":"Exposant","Italic text":"Texte en italique","Move out of an inline code style":"Sortir d'un style de code en ligne","Bold text":"Texte en gras","Underline text":"Souligner le texte","Strikethrough text":"Texte barré"}}};
e[ 'fr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'fr' ].dictionary = Object.assign( e[ 'fr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'fr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
