/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'gl' ]: { dictionary, getPluralForm } } = {"gl":{"dictionary":{"Widget toolbar":"Barra de ferramentas de trebellos","Insert paragraph before block":"Inserir parágrafo antes do bloque","Insert paragraph after block":"Inserir parágrafo após o bloque","Press Enter to type after or press Shift + Enter to type before the widget":"Prema Intro para escribir após ou prema Maiús + Intro para escribir antes do trebello","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Teclas de atallo que se poden usar cando se selecciona un trebello (por exemplo: imaxe, táboa, etc.)","Insert a new paragraph directly after a widget":"Inserir directamente un novo parágrafo após un trebello","Insert a new paragraph directly before a widget":"Inserir directamente un novo parágrafo antes dun trebello","Move the caret to allow typing directly before a widget":"Mover o cursor para permitir escribir directamente antes dun trebello","Move the caret to allow typing directly after a widget":"Mover o cursor para permitir escribir directamente após un trebello","Move focus from an editable area back to the parent widget":"Mover o foco dunha área editábel de volta ao trebello principal"},getPluralForm(n){return (n != 1);}}};
e[ 'gl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'gl' ].dictionary = Object.assign( e[ 'gl' ].dictionary, dictionary );
e[ 'gl' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
