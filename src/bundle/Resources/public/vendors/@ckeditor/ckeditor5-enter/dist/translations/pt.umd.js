/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pt' ]: { dictionary, getPluralForm } } = {"pt":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"Inserir uma quebra suave (um elemento <code>&lt;br&gt;</code>)","Insert a hard break (a new paragraph)":"Inserir uma quebra brusca (um novo parágrafo)"},getPluralForm(n){return (n != 1);}}};
e[ 'pt' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pt' ].dictionary = Object.assign( e[ 'pt' ].dictionary, dictionary );
e[ 'pt' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
