/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: { dictionary, getPluralForm } } = {"pt-br":{"dictionary":{"Widget toolbar":"Ferramentas de Widgets","Insert paragraph before block":"Inserir parágrafo antes do bloco","Insert paragraph after block":"Inserir parágrafo após o bloco","Press Enter to type after or press Shift + Enter to type before the widget":"Pressione Enter para digitar depois ou pressione Shift + Enter para digitar antes do widget","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Teclas que podem ser usadas quando um widget está selecionado (por exemplo: imagem, tabela, etc.)","Insert a new paragraph directly after a widget":"Inserir um novo parágrafo diretamente após um widget","Insert a new paragraph directly before a widget":"Inserir um novo parágrafo diretamente antes de um widget","Move the caret to allow typing directly before a widget":"Mova o cursor para permitir a digitação diretamente antes de um widget","Move the caret to allow typing directly after a widget":"Mova o cursor para permitir a digitação diretamente após um widget","Move focus from an editable area back to the parent widget":"Mova o foco de uma área editável de volta para o widget-pai"},getPluralForm(n){return (n != 1);}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, dictionary );
e[ 'pt-br' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
