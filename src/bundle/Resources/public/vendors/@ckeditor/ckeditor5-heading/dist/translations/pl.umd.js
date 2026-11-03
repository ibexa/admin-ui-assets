/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'pl' ]: translations } = {"pl":{"dictionary":{"Heading":"Nagłówek","Choose heading":"Wybierz nagłówek","Heading 1":"Nagłówek 1","Heading 2":"Nagłówek 2","Heading 3":"Nagłówek 3","Heading 4":"Nagłówek 4","Heading 5":"Nagłówek 5","Heading 6":"Nagłówek 6","Type your title":"Podaj tytuł","Type or paste your content here.":"Wpisz lub wklej tutaj treść dokumentu."}}};
e[ 'pl' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'pl' ].dictionary = Object.assign( e[ 'pl' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'pl' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
