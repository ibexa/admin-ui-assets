/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: translations } = {"pt-br":{"dictionary":{"Bookmark":"Favorito","Edit bookmark":"Editar favorito","Remove bookmark":"Remover favorito","Bookmark name":"Nome do favorito","Enter the bookmark name without spaces.":"Insira o nome do favorito sem espaços.","Bookmark must not be empty.":"O favorito não pode estar vazio.","Bookmark name cannot contain space characters.":"O nome do favorito não pode conter caracteres de espaço.","Bookmark name already exists.":"O nome do favorito já existe.","bookmark widget":"widget de favorito","Bookmark toolbar":"Barra de favoritos","Bookmarks":"Favoritos","No bookmarks available.":"Nenhum favorito disponível.","Scroll to bookmark":"Rolar até o favorito"}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt-br' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
