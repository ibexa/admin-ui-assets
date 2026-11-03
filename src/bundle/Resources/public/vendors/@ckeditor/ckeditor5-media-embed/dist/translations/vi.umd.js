/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'vi' ]: translations } = {"vi":{"dictionary":{"media widget":"tiện ích đa phương tiện","Media URL":"Đường dẫn đa phương tiện","Paste the media URL in the input.":"Dán đường dẫn đa phương tiện vào trường","Tip: Paste the URL into the content to embed faster.":"Mẹo: Dán đường dẫn vào nội dung để nhúng ngay","The URL must not be empty.":"Đường dẫn không được để trống","This media URL is not supported.":"Đường dẫn đa phương tiện không hỗ trợ","Insert media":"Chèn đa phương tiện","Media embed":"Nhúng tệp đa phương tiện","Media":"Phương tiện","Media toolbar":"Thanh công cụ đa phương tiện","Open media in new tab":"Mở nội dung nghe nhìn trong tab mới","Left aligned media":"Phương tiện được căn trái","Centered media":"Phương tiện được căn giữa","Right aligned media":"Phương tiện được căn phải","Resize media":"Thay đổi kích thước tập tin đa phương tiện","Resize media to %0":"Thay đổi kích thước tập tin đa phương tiện thành %0","Resize media to the original size":"Thay đổi kích thước tập tin đa phương tiện về kích thước ban đầu","Resize media (in %0)":"Thay đổi kích thước tập tin đa phương tiện (ở %0)","Custom media size":"Kích thước tập tin đa phương tiện tùy chỉnh","Media resize list":"Danh sách thay đổi kích thước tập tin đa phương tiện","Media Resize":"Thay đổi kích thước tập tin đa phương tiện"}}};
e[ 'vi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'vi' ].dictionary = Object.assign( e[ 'vi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'vi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
