/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'no' ]: { dictionary, getPluralForm } } = {"no":{"dictionary":{"Numbered List":"Nummerert liste","Bulleted List":"Punktliste","To-do List":"Oppgaveliste","Bulleted list styles toolbar":"Verktøylinje for punktlistestiler","Numbered list styles toolbar":"Verktøylinje for stiler for nummererte lister","Toggle the disc list style":"Veksle disklistestil","Toggle the circle list style":"Veksle sirkellistestil","Toggle the square list style":"Veksle firkantlistestil","Toggle the decimal list style":"Veksle nummerlistestil","Toggle the decimal with leading zero list style":"Veksle listestilen med nummer med foranstilt null","Toggle the lower–roman list style":"Veksle listestilen med små romertall","Toggle the upper–roman list style":"Veksle listestilen med store romertall","Toggle the lower–latin list style":"Veksle listestilen med små latinske tegn","Toggle the upper–latin list style":"Veksle listestilen med store latinske tegn","Disc":"Disk","Circle":"Sirkel","Square":"Firkant","Decimal":"Nummer","Decimal with leading zero":"Nummer med foranstilt null","Lower–roman":"Små romertall","Upper-roman":"Store romertall","Lower-latin":"Små latinske tegn","Upper-latin":"Store latinske tegn","List properties":"Listeegenskaper","Start at":"Start ved","Invalid start index value.":"Ugyldig verdi for startindeks.","Start index must be greater than 0.":"Startindeks må være større enn 0.","Reversed order":"Motsatt rekkefølge","Keystrokes that can be used in a list":"Tastetrykk som kan brukes i en liste","Increase list item indent":"Øk innrykk for listeelementer","Decrease list item indent":"Reduser innrykk for listeelementer","Entering a to-do list":"Går inn i en huskeliste","Leaving a to-do list":"Legger igjen en huskeliste"},getPluralForm(n){return (n != 1);}}};
e[ 'no' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'no' ].dictionary = Object.assign( e[ 'no' ].dictionary, dictionary );
e[ 'no' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
