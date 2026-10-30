/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'it' ]: translations } = {"it":{"dictionary":{"Insert HTML":"Inserisci HTML","HTML snippet":"Frammento HTML","Paste raw HTML here...":"Incolla qui HTML non elaborato...","Edit source":"Modifica sorgente","Save changes":"Salva modifiche","No preview available":"Nessuna anteprima disponibile","Empty snippet content":"Contenuto frammento di codice vuoto"}}};
e[ 'it' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'it' ].dictionary = Object.assign( e[ 'it' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'it' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
