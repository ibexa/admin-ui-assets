/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'da' ]: translations } = {"da":{"dictionary":{"Heading":"Overskrift","Choose heading":"Vælg overskrift","Heading 1":"Overskrift 1","Heading 2":"Overskrift 2","Heading 3":"Overskrift 3","Heading 4":"Overskrift 4","Heading 5":"Overskrift 5","Heading 6":"Overskrift 6","Type your title":"Skriv din titel","Type or paste your content here.":"Skriv eller indsæt dit indhold her."}}};
e[ 'da' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'da' ].dictionary = Object.assign( e[ 'da' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'da' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
