/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'it' ]: { dictionary, getPluralForm } } = {"it":{"dictionary":{"Heading":"Intestazione","Choose heading":"Seleziona intestazione","Heading 1":"Intestazione 1","Heading 2":"Intestazione 2","Heading 3":"Intestazione 3","Heading 4":"Intestazione 4","Heading 5":"Intestazione 5","Heading 6":"Intestazione 6","Type your title":"Inserire il proprio titolo","Type or paste your content here.":"Inserire o incollare qui il proprio contenuto."},getPluralForm(n){return (n != 1);}}};
e[ 'it' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'it' ].dictionary = Object.assign( e[ 'it' ].dictionary, dictionary );
e[ 'it' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
