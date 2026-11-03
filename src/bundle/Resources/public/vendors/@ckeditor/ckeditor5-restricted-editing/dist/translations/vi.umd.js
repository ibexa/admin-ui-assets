/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'vi' ]: translations } = {"vi":{"dictionary":{"Disable editing":"Tắt tính năng chỉnh sửa","Enable editing":"Bật tính năng chỉnh sửa","Disable inline editing":"Tắt tính năng chỉnh sửa nội tuyến","Enable inline editing":"Bật tính năng chỉnh sửa nội tuyến","Disable block editing":"Tắt tính năng chỉnh sửa khối","Enable block editing":"Bật tính năng chỉnh sửa khối","Previous editable region":"Vùng có thể chỉnh sửa trước đó","Next editable region":"Vùng có thể chỉnh sửa tiếp theo","Navigate editable regions":"Di chuyển giữa các vùng có thể chỉnh sửa"}}};
e[ 'vi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'vi' ].dictionary = Object.assign( e[ 'vi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'vi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
