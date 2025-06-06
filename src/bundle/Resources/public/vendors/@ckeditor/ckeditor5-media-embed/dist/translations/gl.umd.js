/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'gl' ]: { dictionary, getPluralForm } } = {"gl":{"dictionary":{"media widget":"Trebello multimedia","Media URL":"URL multimedia","Paste the media URL in the input.":"Pegue o URL do medio na entrada.","Tip: Paste the URL into the content to embed faster.":"Consello: Pegue o URL no contido para incrustalo máis rápido.","The URL must not be empty.":"O URL non debe estar baleiro.","This media URL is not supported.":"Este URL multimedia non é compatible.","Insert media":"Inserir elemento multimedia","Media":"Elemento multimedia","Media toolbar":"Barra de ferramentas de multimedia","Open media in new tab":"Abrir multimedia nunha nova lapela","Media embed":""},getPluralForm(n){return (n != 1);}}};
e[ 'gl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'gl' ].dictionary = Object.assign( e[ 'gl' ].dictionary, dictionary );
e[ 'gl' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
