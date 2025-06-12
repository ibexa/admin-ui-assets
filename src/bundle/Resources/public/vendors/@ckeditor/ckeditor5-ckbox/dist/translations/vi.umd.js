/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'vi' ]: { dictionary, getPluralForm } } = {"vi":{"dictionary":{"Open file manager":"Mở trình quản lý tệp","Cannot determine a category for the uploaded file.":"Không thể xác định danh mục cho tệp được tải lên.","Cannot access default workspace.":"Không thể truy cập vào không gian làm việc mặc định.","You have no image editing permissions.":"Bạn không có quyền chỉnh sửa ảnh.","Edit image":"Chỉnh sửa hình ảnh","Processing the edited image.":"Xử lý hình ảnh đã chỉnh sửa.","Server failed to process the image.":"Máy chủ không thể xử lý hình ảnh.","Failed to determine category of edited image.":"Không thể xác định danh mục hình ảnh đã chỉnh sửa."},getPluralForm(n){return 0;}}};
e[ 'vi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'vi' ].dictionary = Object.assign( e[ 'vi' ].dictionary, dictionary );
e[ 'vi' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
