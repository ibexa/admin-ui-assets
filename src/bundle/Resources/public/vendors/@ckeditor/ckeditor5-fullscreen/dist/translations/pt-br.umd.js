/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: translations } = {"pt-br":{"dictionary":{"Enter fullscreen mode":"Entrar no modo tela cheia","Leave fullscreen mode":"Sair do modo tela cheia","Fullscreen mode":"Modo tela cheia","Toggle fullscreen mode":"Alternar modo tela cheia","Document outline":"Contorno do documento","Connected users":"Usuários conectados","Show left sidebar":"Mostrar barra lateral esquerda","Hide left sidebar":"Ocultar barra lateral esquerda","Toggle sidebar":"Alternar barra lateral"}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt-br' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
