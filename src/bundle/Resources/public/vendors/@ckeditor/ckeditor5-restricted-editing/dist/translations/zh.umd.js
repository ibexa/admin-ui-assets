/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'zh' ]: translations } = {"zh":{"dictionary":{"Disable editing":"禁止編輯","Enable editing":"啟用編輯","Disable inline editing":"停用直接編輯","Enable inline editing":"啟用直接編輯","Disable block editing":"停用區塊編輯","Enable block editing":"啟用區塊編輯","Previous editable region":"上一個可編輯區域","Next editable region":"下一個可編輯區域","Navigate editable regions":"編輯區域導航"}}};
e[ 'zh' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh' ].dictionary = Object.assign( e[ 'zh' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'zh' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
