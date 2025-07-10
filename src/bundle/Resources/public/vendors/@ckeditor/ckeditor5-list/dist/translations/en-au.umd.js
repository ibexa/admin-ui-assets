/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'en-au' ]: { dictionary, getPluralForm } } = {"en-au":{"dictionary":{"Numbered List":"Numbered List","Bulleted List":"Bulleted List","To-do List":"To-do List","Bulleted list styles toolbar":"Bulleted list styles toolbar","Numbered list styles toolbar":"Numbered list styles toolbar","Toggle the disc list style":"Toggle the disc list style","Toggle the circle list style":"Toggle the circle list style","Toggle the square list style":"Toggle the square list style","Toggle the decimal list style":"Toggle the decimal list style","Toggle the decimal with leading zero list style":"Toggle the decimal with leading zero list style","Toggle the lower–roman list style":"Toggle the lower–roman list style","Toggle the upper–roman list style":"Toggle the upper–roman list style","Toggle the lower–latin list style":"Toggle the lower–latin list style","Toggle the upper–latin list style":"Toggle the upper–latin list style","Disc":"Disc","Circle":"Circle","Square":"Square","Decimal":"Decimal","Decimal with leading zero":"Decimal with leading zero","Lower–roman":"Lower–roman","Upper-roman":"Upper-roman","Lower-latin":"Lower-latin","Upper-latin":"Upper-latin","List properties":"List properties","Start at":"Start at","Invalid start index value.":"","Start index must be greater than 0.":"Start index must be greater than 0.","Reversed order":"Reversed order","Keystrokes that can be used in a list":"","Increase list item indent":"","Decrease list item indent":"","Entering a to-do list":"","Leaving a to-do list":""},getPluralForm(n){return (n != 1);}}};
e[ 'en-au' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'en-au' ].dictionary = Object.assign( e[ 'en-au' ].dictionary, dictionary );
e[ 'en-au' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
