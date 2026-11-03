/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'gl' ]: translations } = {"gl":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"Inserir un salto suave (un elemento <code>&lt;br&gt;</code>)","Insert a hard break (a new paragraph)":"Inserir un salto duro (un novo parágrafo)"}}};
e[ 'gl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'gl' ].dictionary = Object.assign( e[ 'gl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'gl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
