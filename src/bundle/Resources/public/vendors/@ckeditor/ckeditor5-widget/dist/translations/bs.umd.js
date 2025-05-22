/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bs' ]: { dictionary, getPluralForm } } = {"bs":{"dictionary":{"Widget toolbar":"","Insert paragraph before block":"","Insert paragraph after block":"","Press Enter to type after or press Shift + Enter to type before the widget":"","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"","Insert a new paragraph directly after a widget":"","Insert a new paragraph directly before a widget":"","Move the caret to allow typing directly before a widget":"","Move the caret to allow typing directly after a widget":"","Move focus from an editable area back to the parent widget":""},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'bs' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bs' ].dictionary = Object.assign( e[ 'bs' ].dictionary, dictionary );
e[ 'bs' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
