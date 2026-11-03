/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'zh-cn' ]: translations } = {"zh-cn":{"dictionary":{"Insert a soft break (a <code>&lt;br&gt;</code> element)":"插入软换行（一个<code>&lt;br&gt;</code> 元素）","Insert a hard break (a new paragraph)":"插入硬换行（新段落）"}}};
e[ 'zh-cn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh-cn' ].dictionary = Object.assign( e[ 'zh-cn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'zh-cn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
