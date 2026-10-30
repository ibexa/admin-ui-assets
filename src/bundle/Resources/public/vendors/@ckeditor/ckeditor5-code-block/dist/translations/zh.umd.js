/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'zh' ]: translations } = {"zh":{"dictionary":{"Insert code block":"插入程式碼區塊","Plain text":"純文字","Leaving %0 code snippet":"離開 %0 程式碼片段","Entering %0 code snippet":"進入 %0 程式碼片段","Entering code snippet":"進入程式碼片段","Leaving code snippet":"離開程式碼片段","Code block":"程式碼區塊"}}};
e[ 'zh' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh' ].dictionary = Object.assign( e[ 'zh' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'zh' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
