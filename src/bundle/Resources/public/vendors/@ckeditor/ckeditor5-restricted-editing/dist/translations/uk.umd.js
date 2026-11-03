/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Disable editing":"Вимкнути редагування","Enable editing":"Увімкнути редагування","Disable inline editing":"Вимкнути редагування рядків","Enable inline editing":"Увімкнути редагування рядків","Disable block editing":"Вимкнути редагування блоків","Enable block editing":"Увімкнути редагування блоків","Previous editable region":"Попередня область редагування","Next editable region":"Наступна область редагування","Navigate editable regions":"Навігація по областях редагування"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
