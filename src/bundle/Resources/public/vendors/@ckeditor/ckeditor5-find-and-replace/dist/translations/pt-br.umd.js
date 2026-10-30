/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt-br' ]: translations } = {"pt-br":{"dictionary":{"Find and replace":"Localizar e substituir","Find in text…":"Localizar no texto","Find":"Localizar","Previous result":"Ocorrência anterior","Next result":"Próxima ocorrência","Replace":"Substituir","Replace all":"Substituir todos","Match case":"Diferenciar maiúsculas de minúsculas","Whole words only":"Apenas palavras inteiras","Replace with…":"Substituir por...","Text to find must not be empty.":"O texto a ser localizado não pode ser vazio.","Tip: Find some text first in order to replace it.":"Dica: Localize algum texto primeiro para poder substituí-lo.","Advanced options":"Opções avançadas","Find in the document":"Pesquisar no documento"}}};
e[ 'pt-br' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt-br' ].dictionary = Object.assign( e[ 'pt-br' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt-br' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
