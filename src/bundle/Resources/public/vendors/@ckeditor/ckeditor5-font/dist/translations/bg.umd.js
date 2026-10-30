/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'bg' ]: translations } = {"bg":{"dictionary":{"Font Size":"Размер на шрифта","Tiny":"Много малък","Small":"Малък","Big":"Едър","Huge":"Много едър","Font Family":"Семейство шрифтове","Default":"По подразбиране","Font Color":"Цвят на шрифта","Font Background Color":"Цвят на шрифтовия фон","Document colors":"Цвят на документа"}}};
e[ 'bg' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'bg' ].dictionary = Object.assign( e[ 'bg' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'bg' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
