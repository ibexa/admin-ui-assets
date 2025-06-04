/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ca' ]: { dictionary, getPluralForm } } = {"ca":{"dictionary":{"media widget":"giny multimèdia","Media URL":"URL dels mitjans","Paste the media URL in the input.":"Enganxar l'URL del contingut multimèdia a l'entrada.","Tip: Paste the URL into the content to embed faster.":"Consell: Enganxa l'URL al contingut per inserir-lo més ràpid.","The URL must not be empty.":"L'URL no pot estar buit.","This media URL is not supported.":"Aquest URL multimèdia no és compatible.","Insert media":"Introduir multimèdia","Media":"Multimèdia","Media toolbar":"Barra d'eines multimèdia","Open media in new tab":"Obriu l'enllaç a una nova pestanya","Media embed":"Insereix contingut multimèdia"},getPluralForm(n){return (n != 1);}}};
e[ 'ca' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ca' ].dictionary = Object.assign( e[ 'ca' ].dictionary, dictionary );
e[ 'ca' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
