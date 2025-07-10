/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ro' ]: { dictionary, getPluralForm } } = {"ro":{"dictionary":{"Widget toolbar":"Bară widget","Insert paragraph before block":"Inserează un paragraf înaintea blocului","Insert paragraph after block":"Inserează un paragraf după bloc","Press Enter to type after or press Shift + Enter to type before the widget":"Apăsați Enter pentru a scrie după widget sau Shift+Enter pentru a scrie înaintea acestuia","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Comenzi din tastatură care pot fi utilizate atunci când este selectat un widget (de exemplu: imagine, tabel etc.)","Insert a new paragraph directly after a widget":"Inserează un nou paragraf direct după un widget","Insert a new paragraph directly before a widget":"Inserează un nou paragraf direct înaintea unui widget","Move the caret to allow typing directly before a widget":"Mută cursorul pentru a permite tastarea direct înaintea unui widget","Move the caret to allow typing directly after a widget":"Mută cursorul pentru a permite tastarea direct după un widget","Move focus from an editable area back to the parent widget":"Mutați centrul de interes dintr-o zonă editabilă înapoi la widgetul părinte"},getPluralForm(n){return (n == 1 ? 0 : (n == 0 || (n % 100 > 0 && n % 100 < 20)) ? 1 : 2);}}};
e[ 'ro' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ro' ].dictionary = Object.assign( e[ 'ro' ].dictionary, dictionary );
e[ 'ro' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
