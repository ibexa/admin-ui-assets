/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'et' ]: { dictionary, getPluralForm } } = {"et":{"dictionary":{"Heading":"Pealkiri","Choose heading":"Vali pealkiri","Heading 1":"Pealkiri 1","Heading 2":"Pealkiri 2","Heading 3":"Pealkiri 3","Heading 4":"Pealkiri 4","Heading 5":"Pealkiri 5","Heading 6":"Pealkiri 6","Type your title":"Sisesta pealkiri","Type or paste your content here.":"Siia tipi või kopeeri tekst."},getPluralForm(n){return (n != 1);}}};
e[ 'et' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'et' ].dictionary = Object.assign( e[ 'et' ].dictionary, dictionary );
e[ 'et' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
