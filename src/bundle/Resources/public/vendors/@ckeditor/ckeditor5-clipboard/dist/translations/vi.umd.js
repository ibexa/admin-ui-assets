/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'vi' ]: translations } = {"vi":{"dictionary":{"Copy selected content":"Sao chép nội dung đã chọn","Paste content":"Dán nội dung","Paste content as plain text":"Dán nội dung dưới dạng văn bản thuần túy"}}};
e[ 'vi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'vi' ].dictionary = Object.assign( e[ 'vi' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'vi' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
