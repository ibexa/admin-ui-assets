/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Font Size":"Размер шрифта","Tiny":"Очень мелкий","Small":"Мелкий","Big":"Крупный","Huge":"Очень крупный","Font Family":"Семейство шрифтов","Default":"По умолчанию","Font Color":"Цвет шрифта","Font Background Color":"Цвет фона","Document colors":"Цвет страницы"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
