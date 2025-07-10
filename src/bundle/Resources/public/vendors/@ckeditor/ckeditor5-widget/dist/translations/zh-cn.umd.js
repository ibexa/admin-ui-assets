/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'zh-cn' ]: { dictionary, getPluralForm } } = {"zh-cn":{"dictionary":{"Widget toolbar":"小部件工具栏","Insert paragraph before block":"在前面插入段落","Insert paragraph after block":"在后面插入段落","Press Enter to type after or press Shift + Enter to type before the widget":"按下“Enter”键，在小组件后输入；按下“Shift+Enter”键，在小组件前输入","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"当小组件被选中时（例如：图片、表格等）可以使用的按键","Insert a new paragraph directly after a widget":"直接在小组件之后插入新段落","Insert a new paragraph directly before a widget":"直接在小组件之前插入新段落","Move the caret to allow typing directly before a widget":"移动插入符，以允许在小组件之前直接输入文字","Move the caret to allow typing directly after a widget":"移动插入符，以允许在小组件之后直接输入文字","Move focus from an editable area back to the parent widget":"将焦点从可编辑区域移回父窗口小组件"},getPluralForm(n){return 0;}}};
e[ 'zh-cn' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'zh-cn' ].dictionary = Object.assign( e[ 'zh-cn' ].dictionary, dictionary );
e[ 'zh-cn' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
