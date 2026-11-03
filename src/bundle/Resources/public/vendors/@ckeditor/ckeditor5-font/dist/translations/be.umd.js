/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'be' ]: translations } = {"be":{"dictionary":{"Font Size":"Памер шрыфту","Tiny":"Вельмі малы","Small":"Мелкі","Big":"Крупны","Huge":"Вельмі крупны","Font Family":"Сям'я шрыфтаў","Default":"Па ўмове","Font Color":"Колер шрыфту","Font Background Color":"Колер фону шрыфту","Document colors":"Колеры дакумента"}}};
e[ 'be' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'be' ].dictionary = Object.assign( e[ 'be' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'be' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
