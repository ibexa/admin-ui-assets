/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Insert code block":"Уставіць код","Plain text":"Просты тэкст","Leaving %0 code snippet":"Астаўляем фрагмент кода %0","Entering %0 code snippet":"Увод фрагмента кода %0","Entering code snippet":"Увод фрагмента кода","Leaving code snippet":"Астаўляем фрагмент кода","Code block":"Блок кода"}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
