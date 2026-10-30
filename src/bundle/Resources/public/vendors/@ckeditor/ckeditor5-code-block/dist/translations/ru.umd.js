/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Insert code block":"Вставить код","Plain text":"Простой текст","Leaving %0 code snippet":"Оставляем фрагмент кода %0","Entering %0 code snippet":"Ввод фрагмента кода %0","Entering code snippet":"Ввод фрагмента кода","Leaving code snippet":"Оставляем фрагмент кода","Code block":"Блок кодов"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
