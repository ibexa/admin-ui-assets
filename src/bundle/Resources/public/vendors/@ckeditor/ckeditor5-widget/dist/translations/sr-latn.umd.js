/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr-latn' ]: { dictionary, getPluralForm } } = {"sr-latn":{"dictionary":{"Widget toolbar":"Видгет трака са алаткама","Insert paragraph before block":"Уметните одломак пре блока","Insert paragraph after block":"Уметните одломак после блока","Press Enter to type after or press Shift + Enter to type before the widget":"Pritisnite Enter da kucate posle ili pritisnite Shift + Enter da kucate pre vidžeta","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Pritisci na tastere koji se mogu koristiti kada je vidžet izabran (na primer: slika, tabela, itd.)  ","Insert a new paragraph directly after a widget":"Umetnite novi pasus direktno posle vidžeta","Insert a new paragraph directly before a widget":"Umetnite novi pasus direktno ispred vidžeta","Move the caret to allow typing directly before a widget":"Pomerite kursor da biste omogućili kucanje direktno pre vidžeta","Move the caret to allow typing directly after a widget":"Pomerite kursor da biste omogućili kucanje direktno posle vidžeta","Move focus from an editable area back to the parent widget":"Pomerite fokus sa oblasti za uređivanje nazad na roditeljski vidžet"},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'sr-latn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr-latn' ].dictionary = Object.assign( e[ 'sr-latn' ].dictionary, dictionary );
e[ 'sr-latn' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
