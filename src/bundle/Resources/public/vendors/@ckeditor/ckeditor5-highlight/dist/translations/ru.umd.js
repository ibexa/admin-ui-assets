/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Yellow marker":"Выделение жёлтым маркером","Green marker":"Выделение зелёным маркером","Pink marker":"Выделение розовым маркером","Blue marker":"Выделение синим маркером","Red pen":"Красный цвет текста","Green pen":"Зеленый цвет текста","Remove highlight":"Убрать выделение","Highlight":"Выделить","Text highlight toolbar":"Панель инструментов выделения текста"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
