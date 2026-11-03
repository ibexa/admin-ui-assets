/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'zh-cn' ]: translations } = {"zh-cn":{"dictionary":{"Copy selected content":"复制选定的内容","Paste content":"粘贴内容","Paste content as plain text":"将内容粘贴为纯文本"}}};
e[ 'zh-cn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh-cn' ].dictionary = Object.assign( e[ 'zh-cn' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'zh-cn' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
