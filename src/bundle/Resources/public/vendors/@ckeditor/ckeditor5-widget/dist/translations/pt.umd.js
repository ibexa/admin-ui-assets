/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt' ]: { dictionary, getPluralForm } } = {"pt":{"dictionary":{"Widget toolbar":"Barra de ferramentas do widget","Insert paragraph before block":"Inserir parágrafo antes do bloco","Insert paragraph after block":"Inserir parágrafo após o bloco","Press Enter to type after or press Shift + Enter to type before the widget":"Prima Enter para escrever depois ou Shift + Enter para escrever antes do widget","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Batimentos de teclas que podem ser utilizados quando um widget é selecionado (por exemplo: imagem, tabela, etc.)","Insert a new paragraph directly after a widget":"Inserir um novo parágrafo diretamente após um widget","Insert a new paragraph directly before a widget":"Inserir um novo parágrafo diretamente antes de um widget","Move the caret to allow typing directly before a widget":"Mover o ponto de inserção para permitir escrever diretamente antes de um widget","Move the caret to allow typing directly after a widget":"Mover o ponto de inserção para permitir escrever diretamente após um widget","Move focus from an editable area back to the parent widget":"Deslocar o foco de uma área editável de volta para o widget principal"},getPluralForm(n){return (n != 1);}}};
e[ 'pt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt' ].dictionary = Object.assign( e[ 'pt' ].dictionary, dictionary );
e[ 'pt' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
