/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'vi' ]: translations } = {"vi":{"dictionary":{"Font Size":"Cỡ chữ","Tiny":"Bé","Small":"Nhỏ","Big":"Lớn","Huge":"Khổng lồ","Font Family":"Họ chữ","Default":"Mặc định","Font Color":"Màu chữ","Font Background Color":"Màu nền chữ","Document colors":"Màu văn bản"}}};
e[ 'vi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'vi' ].dictionary = Object.assign( e[ 'vi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'vi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
