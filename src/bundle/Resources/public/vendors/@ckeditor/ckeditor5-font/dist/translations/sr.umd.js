/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'sr' ]: translations } = {"sr":{"dictionary":{"Font Size":"Величина фонта","Tiny":"Ситно","Small":"Мало","Big":"Велико","Huge":"Огромно","Font Family":"Фонт","Default":"Основни","Font Color":"Боја слова","Font Background Color":"Боја позадине слова","Document colors":"Боје документа"}}};
e[ 'sr' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'sr' ].dictionary = Object.assign( e[ 'sr' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'sr' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
