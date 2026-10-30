/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt' ]: translations } = {"pt":{"dictionary":{"media widget":"Miniaplicação de media","Media URL":"URL de media","Paste the media URL in the input.":"Cole o URL de média no input.","Tip: Paste the URL into the content to embed faster.":"Dica: Cole o URL no conteúdo para incorporar mais rapidamente.","The URL must not be empty.":"O URL não pode ficar vazio.","This media URL is not supported.":"Este URL de media não é suportado.","Insert media":"Inserir media","Media embed":"Incorporar média","Media":"Multimédia","Media toolbar":"Barra de ferramentas de media","Open media in new tab":"Abrir ficheiro multimédia em novo separador","Left aligned media":"Conteúdo multimédia alinhado à esquerda","Centered media":"Conteúdo multimédia centrado","Right aligned media":"Conteúdo multimédia alinhado à direita","Resize media":"Redimensionar multimédia","Resize media to %0":"Redimensionar multimédia para %0","Resize media to the original size":"Redimensionar multimédia para o tamanho original","Resize media (in %0)":"Redimensionar multimédia (em %0)","Custom media size":"Tamanho multimédia personalizado","Media resize list":"Lista de redimensionamento multimédia","Media Resize":"Redimensionamento Multimédia"}}};
e[ 'pt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt' ].dictionary = Object.assign( e[ 'pt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
