/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uz' ]: { dictionary, getPluralForm } } = {"uz":{"dictionary":{"Numbered List":"Raqamlangan ro'yxat","Bulleted List":"Belgilangan roʻyxat","To-do List":"","Bulleted list styles toolbar":"Belgilangan ro'yxat uslublari","Numbered list styles toolbar":"Raqamlangan ro'yxat uslublari","Toggle the disc list style":"","Toggle the circle list style":"","Toggle the square list style":"","Toggle the decimal list style":"","Toggle the decimal with leading zero list style":"","Toggle the lower–roman list style":"","Toggle the upper–roman list style":"","Toggle the lower–latin list style":"","Toggle the upper–latin list style":"","Disc":"Disk","Circle":"Doira","Square":"Kvadrat","Decimal":"O'nlik","Decimal with leading zero":"Boshlovchi nol bilan oʻnlik","Lower–roman":"Kichik rim","Upper-roman":"Katta rim","Lower-latin":"Kichik lotincha","Upper-latin":"Katta lotincha","List properties":"","Start at":"","Invalid start index value.":"","Start index must be greater than 0.":"","Reversed order":"","Keystrokes that can be used in a list":"","Increase list item indent":"","Decrease list item indent":"","Entering a to-do list":"","Leaving a to-do list":""},getPluralForm(n){return (n > 1);}}};
e[ 'uz' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uz' ].dictionary = Object.assign( e[ 'uz' ].dictionary, dictionary );
e[ 'uz' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
