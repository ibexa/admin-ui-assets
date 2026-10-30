/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'vi' ]: translations } = {"vi":{"dictionary":{"Enter fullscreen mode":"Vào chế độ toàn màn hình","Leave fullscreen mode":"Thoát chế độ toàn màn hình","Fullscreen mode":"Chế độ toàn màn hình","Toggle fullscreen mode":"Chuyển đổi chế độ toàn màn hình","Document outline":"Bố cục tài liệu","Connected users":"Những người dùng đã kết nối","Show left sidebar":"Hiển thị thanh bên trái","Hide left sidebar":"Ẩn thanh bên trái","Toggle sidebar":"Bật/tắt thanh bên"}}};
e[ 'vi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'vi' ].dictionary = Object.assign( e[ 'vi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'vi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
