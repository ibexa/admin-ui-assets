/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt' ]: translations } = {"pt":{"dictionary":{"Insert code block":"Inserir bloco de citação","Plain text":"Texto simples","Leaving %0 code snippet":"A sair do fragmento de código %0","Entering %0 code snippet":"A introduzir o fragmento de código %0","Entering code snippet":"A introduzir fragmento de código","Leaving code snippet":"A sair do fragmento de código","Code block":"Bloco de código"}}};
e[ 'pt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt' ].dictionary = Object.assign( e[ 'pt' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pt' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
