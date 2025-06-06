/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'vi' ]: { dictionary, getPluralForm } } = {"vi":{"dictionary":{"Heading":"Tiêu đề","Choose heading":"Chọn tiêu đề","Heading 1":"Tiêu đề 1","Heading 2":"Tiêu đề 2","Heading 3":"Tiêu đề 3","Heading 4":"Tiêu đề 4","Heading 5":"Tiêu đề 5","Heading 6":"Tiêu đề 6","Type your title":"Nhập tựa đề","Type or paste your content here.":"Nhập hoặc dán nội dung tại đây"},getPluralForm(n){return 0;}}};
e[ 'vi' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'vi' ].dictionary = Object.assign( e[ 'vi' ].dictionary, dictionary );
e[ 'vi' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
