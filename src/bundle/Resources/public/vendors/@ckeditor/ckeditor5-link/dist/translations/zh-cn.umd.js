/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'zh-cn' ]: { dictionary, getPluralForm } } = {"zh-cn":{"dictionary":{"Unlink":"取消超链接","Link":"超链接","Link URL":"链接网址","Link URL must not be empty.":"链接 URL 不能为空。","Link image":"链接图片","Edit link":"修改链接","Open link in new tab":"在新标签页中打开链接","Open in a new tab":"在新标签页中打开","Downloadable":"可下载","Create link":"创建链接","Move out of a link":"移出链接","Link properties":"链接属性","Displayed text":"显示的文本","No links available":"无可用链接"},getPluralForm(n){return 0;}}};
e[ 'zh-cn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh-cn' ].dictionary = Object.assign( e[ 'zh-cn' ].dictionary, dictionary );
e[ 'zh-cn' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
