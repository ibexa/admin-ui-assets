/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'no' ]: { dictionary, getPluralForm } } = {"no":{"dictionary":{"Heading":"Overskrift","Choose heading":"Velg overskrift","Heading 1":"Overskrift 1","Heading 2":"Overskrift 2","Heading 3":"Overskrift 3","Heading 4":"Overskrift 4","Heading 5":"Overskrift 5","Heading 6":"Overskrift 6","Type your title":"Skriv inn tittel","Type or paste your content here.":"Skriv eller lim inn ditt innhold her"},getPluralForm(n){return (n != 1);}}};
e[ 'no' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'no' ].dictionary = Object.assign( e[ 'no' ].dictionary, dictionary );
e[ 'no' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
