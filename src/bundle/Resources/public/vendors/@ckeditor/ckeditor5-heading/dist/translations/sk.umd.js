/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sk' ]: translations } = {"sk":{"dictionary":{"Heading":"Nadpis","Choose heading":"Vyberte nadpis","Heading 1":"Nadpis 1","Heading 2":"Nadpis 2","Heading 3":"Nadpis 3","Heading 4":"Nadpis 4","Heading 5":"Nadpis 5","Heading 6":"Nadpis 6","Type your title":"Vložte nadpis","Type or paste your content here.":"Vložte obsah"}}};
e[ 'sk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sk' ].dictionary = Object.assign( e[ 'sk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
