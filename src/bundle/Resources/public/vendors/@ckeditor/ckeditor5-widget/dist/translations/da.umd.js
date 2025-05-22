/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'da' ]: { dictionary, getPluralForm } } = {"da":{"dictionary":{"Widget toolbar":"Widget værktøjslinje","Insert paragraph before block":"Indsæt paragraf før blok","Insert paragraph after block":"Indsæt paragraf efter blok","Press Enter to type after or press Shift + Enter to type before the widget":"Tryk på Enter for at skrive efter, eller tryk på Shift + Enter for at skrive før widgetten","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Tastaturtryk, der kan bruges når en widget er valgt (for eksempel: billede, tabel, osv.)","Insert a new paragraph directly after a widget":"Indsæt en ny paragraf direkte efter en widget","Insert a new paragraph directly before a widget":"Indsæt en ny paragraf direkte før en widget","Move the caret to allow typing directly before a widget":"Flyt indsætningstegnet for at tillade skrift direkte før en widget","Move the caret to allow typing directly after a widget":"Flyt indsætningstegnet for at tillade skrift direkte efter en widget","Move focus from an editable area back to the parent widget":"Flyt fokus fra et redigerbart område tilbage til den overordnede widget"},getPluralForm(n){return (n != 1);}}};
e[ 'da' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'da' ].dictionary = Object.assign( e[ 'da' ].dictionary, dictionary );
e[ 'da' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
