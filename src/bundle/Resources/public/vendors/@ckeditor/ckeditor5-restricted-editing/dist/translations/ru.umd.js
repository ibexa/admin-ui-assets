/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Disable editing":"Отключить редактирование","Enable editing":"Разрешить редактирование","Disable inline editing":"Отключить встроенное редактирование","Enable inline editing":"Включить встроенное редактирование","Disable block editing":"Отключить блочное редактирование","Enable block editing":"Включить блочное редактирование","Previous editable region":"Предыдущий редактируемый регион","Next editable region":"Следующий редактируемый регион","Navigate editable regions":"Навигация по редактируемым регионам"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
