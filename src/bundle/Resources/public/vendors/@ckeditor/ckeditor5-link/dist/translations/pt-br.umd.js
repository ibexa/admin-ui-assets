/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: { dictionary, getPluralForm } } = {"pt-br":{"dictionary":{"Unlink":"Remover link","Link":"Link","Link URL":"URL do link","Link URL must not be empty.":"O URL do link não pode estar vazio.","Link image":"Link com imagem","Edit link":"Editar link","Open link in new tab":"Abrir link em nova aba","Open in a new tab":"Abrir em nova aba","Downloadable":"Pode ser baixado","Create link":"Criar link","Move out of a link":"Sair de um link","Link properties":"Propriedades do link","Displayed text":"Texto mostrado","No links available":"Nenhum link disponível"},getPluralForm(n){return (n != 1);}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, dictionary );
e[ 'pt-br' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
