/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'el' ]: { dictionary, getPluralForm } } = {"el":{"dictionary":{"Emoji":"Emoji","Show all emoji...":"Εμφάνιση όλων των emoji...","Find an emoji (min. 2 characters)":"Βρείτε ένα emoji (τουλάχιστον 2 χαρακτήρες)","No emojis were found matching \"%0\".":"Δεν βρέθηκαν emoji που να ταιριάζουν με το \"%0\".","Keep on typing to see the emoji.":"Συνεχίστε να πληκτρολογείτε για να δείτε το emoji.","The query must contain at least two characters.":"Το ερώτημα πρέπει να περιέχει τουλάχιστον δύο χαρακτήρες.","Smileys & Expressions":"Χαμογελάκια και Εκφράσεις","Gestures & People":"Χειρονομίες και Άνθρωποι","Animals & Nature":"Ζώα και Φύση","Food & Drinks":"Φαγητό και Ποτά","Travel & Places":"Ταξίδια και Μέρη","Activities":"Δραστηριότητες","Objects":"Αντικείμενα","Symbols":"Σύμβολα","Flags":"Σημαίες","Select skin tone":"Επιλέξτε τόνο επιδερμίδας","Default skin tone":"Προεπιλεγμένος τόνος επιδερμίδας","Light skin tone":"Ανοιχτός τόνος επιδερμίδας","Medium Light skin tone":"Μεσαίος προς ανοιχτό τόνος επιδερμίδας","Medium skin tone":"Μεσαίος τόνος επιδερμίδας","Medium Dark skin tone":"Μεσαίος προς σκούρο τόνος επιδερμίδας","Dark skin tone":"Σκούρος τόνος επιδερμίδας","Emoji picker":"Επιλογέας emoji"},getPluralForm(n){return (n != 1);}}};
e[ 'el' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'el' ].dictionary = Object.assign( e[ 'el' ].dictionary, dictionary );
e[ 'el' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
