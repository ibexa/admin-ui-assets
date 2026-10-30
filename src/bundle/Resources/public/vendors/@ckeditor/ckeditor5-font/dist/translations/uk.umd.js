/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Font Size":"Розмір шрифту","Tiny":"Крихітний","Small":"Маленький","Big":"Великий","Huge":"Величезний","Font Family":"Сімейство шрифтів","Default":"За замовчуванням","Font Color":"Колір шрифту","Font Background Color":"Колір тла шрифту","Document colors":"Кольори документу"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
