/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'gl' ]: translations } = {"gl":{"dictionary":{"Insert HTML":"Inserir HTML","HTML snippet":"Fragmento HTML","Paste raw HTML here...":"Pegar HTML en bruto aquí…","Edit source":"Editar a orixe","Save changes":"Gardar cambios","No preview available":"Non hai vista previa dispoñíbel","Empty snippet content":"Contido de fragmento de código baleiro"}}};
e[ 'gl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'gl' ].dictionary = Object.assign( e[ 'gl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'gl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
