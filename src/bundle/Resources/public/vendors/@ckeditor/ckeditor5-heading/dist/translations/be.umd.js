/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Heading":"Стыль","Choose heading":"Выбар стылю","Heading 1":"Загаловак 1","Heading 2":"Загаловак 2","Heading 3":"Загаловак 3","Heading 4":"Загаловак 4","Heading 5":"Загаловак 5","Heading 6":"Загаловак 6","Type your title":"Увядзіце загаловак","Type or paste your content here.":"Увядзіце або ўстаўце ваш тэкст"}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
