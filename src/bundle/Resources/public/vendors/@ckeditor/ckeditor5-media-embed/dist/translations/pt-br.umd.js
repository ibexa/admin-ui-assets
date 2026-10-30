/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: translations } = {"pt-br":{"dictionary":{"media widget":"Ferramenta de mídia","Media URL":"URL da mídia","Paste the media URL in the input.":"Cole o endereço da mídia no campo.","Tip: Paste the URL into the content to embed faster.":"Cole o endereço dentro do conteúdo para embutir mais rapidamente.","The URL must not be empty.":"A URL não pode ficar em branco.","This media URL is not supported.":"Esta URL de mídia não é suportada.","Insert media":"Inserir mídia","Media embed":"Incorporar elemento de mídia","Media":"Mídia","Media toolbar":"Ferramentas de Mídia","Open media in new tab":"Abrir mídia em nova aba","Left aligned media":"Mídia alinhada à esquerda","Centered media":"Mídia centralizada","Right aligned media":"Mídia alinhada à direita","Resize media":"Redimensionar mídia","Resize media to %0":"Redimensionar mídia para %0","Resize media to the original size":"Redimensionar mídia para o tamanho original","Resize media (in %0)":"Redimensionar mídia (em %0)","Custom media size":"Tamanho de mídia personalizado","Media resize list":"Lista de redimensionamento de mídia","Media Resize":"Redimensionamento de mídia"}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt-br' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
