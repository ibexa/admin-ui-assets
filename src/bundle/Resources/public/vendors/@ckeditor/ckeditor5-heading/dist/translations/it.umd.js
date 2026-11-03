/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'it' ]: translations } = {"it":{"dictionary":{"Heading":"Intestazione","Choose heading":"Seleziona intestazione","Heading 1":"Intestazione 1","Heading 2":"Intestazione 2","Heading 3":"Intestazione 3","Heading 4":"Intestazione 4","Heading 5":"Intestazione 5","Heading 6":"Intestazione 6","Type your title":"Inserire il proprio titolo","Type or paste your content here.":"Inserire o incollare qui il proprio contenuto."}}};
e[ 'it' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'it' ].dictionary = Object.assign( e[ 'it' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'it' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
