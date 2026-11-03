/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Insert HTML":"Вставити HTML","HTML snippet":"Фрагмент HTML","Paste raw HTML here...":"Вставте сюди необроблений HTML...","Edit source":"Редагувати джерело","Save changes":"Зберегти зміни","No preview available":"Попередній перегляд недоступний","Empty snippet content":"Порожній вміст"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
