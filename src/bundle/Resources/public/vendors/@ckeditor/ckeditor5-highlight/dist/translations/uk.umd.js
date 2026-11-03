/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Yellow marker":"Жовтий маркер","Green marker":"Зелений маркер","Pink marker":"Рожевий маркер","Blue marker":"Синій маркер","Red pen":"Червоний маркер","Green pen":"Зелений маркер","Remove highlight":"Видалити виділення","Highlight":"Виділення","Text highlight toolbar":"Панель виділення тексту"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
