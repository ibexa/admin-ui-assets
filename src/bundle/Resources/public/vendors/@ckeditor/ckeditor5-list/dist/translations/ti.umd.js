/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ti' ]: translations } = {"ti":{"dictionary":{"Numbered List":"ብቁጽሪ ዝተመልከቱ ዝርዝራት","Bulleted List":"ብምልክት ዝተመልከቱ ዝርዝራት","To-do List":"","Bulleted list styles toolbar":"","Numbered list styles toolbar":"","Toggle the disc list style":"","Toggle the circle list style":"","Toggle the square list style":"","Toggle the decimal list style":"","Toggle the decimal with leading zero list style":"","Toggle the lower–roman list style":"","Toggle the upper–roman list style":"","Toggle the lower–latin list style":"","Toggle the upper–latin list style":"","Toggle the arabic-indic list style":"","Arabic-indic":"","Disc":"","Circle":"","Square":"","Decimal":"","Decimal with leading zero":"","Lower–roman":"","Upper-roman":"","Lower-latin":"","Upper-latin":"","List properties":"","Start at":"","Invalid start index value.":"","Start index must be greater than 0.":"","Reversed order":"","Keystrokes that can be used in a list":"","Increase list item indent":"","Decrease list item indent":"","Entering a to-do list":"","Leaving a to-do list":""}}};
e[ 'ti' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ti' ].dictionary = Object.assign( e[ 'ti' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ti' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
