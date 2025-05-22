/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: { dictionary, getPluralForm } } = {"be":{"dictionary":{"Widget toolbar":"Панель інструментаў віджэта","Insert paragraph before block":"Уставіць параграф перад блокам","Insert paragraph after block":"Уставіць параграф пасля блока","Press Enter to type after or press Shift + Enter to type before the widget":"Націсніце Enter для ўводу тэксту пасля віджэта або націсніце Shift + Enter для ўводу тэксту перад віджэтам","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Націскі клавіш, якія можна выкарыстоўваць пры выбару віджэта (напрыклад: відарыс, табліца і г. д.)","Insert a new paragraph directly after a widget":"Уставіць новы абзац пасля віджэта.","Insert a new paragraph directly before a widget":"Уставіць новы абзац напярэдзе віджэта.","Move the caret to allow typing directly before a widget":"Перамясціце курсор, каб можна было ўводзіць тэкст напярэдзе віджэта.","Move the caret to allow typing directly after a widget":"Перамясціце курсор, каб можна было ўводзіць тэкст пасля віджэта.","Move focus from an editable area back to the parent widget":"Перамясціце фокус з рэдагававальнай вобласці назад на бацькоўскі віджэт"},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, dictionary );
e[ 'be' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
