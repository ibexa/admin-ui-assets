/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ur' ]: { dictionary, getPluralForm } } = {"ur":{"dictionary":{"Widget toolbar":"آلہ جات برائے وجٹ","Insert paragraph before block":"پیراگراف سے پہلے کوڈ خانہ نصب کریں","Insert paragraph after block":"پیراگراف کے بعد کوڈ خانہ نصب کریں","Press Enter to type after or press Shift + Enter to type before the widget":"","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"","Insert a new paragraph directly after a widget":"","Insert a new paragraph directly before a widget":"","Move the caret to allow typing directly before a widget":"","Move the caret to allow typing directly after a widget":"","Move focus from an editable area back to the parent widget":""},getPluralForm(n){return (n != 1);}}};
e[ 'ur' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ur' ].dictionary = Object.assign( e[ 'ur' ].dictionary, dictionary );
e[ 'ur' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
