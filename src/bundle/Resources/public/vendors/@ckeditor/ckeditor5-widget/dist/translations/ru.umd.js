/**
 * @license Copyright (c) 2003-2025, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: { dictionary, getPluralForm } } = {"ru":{"dictionary":{"Widget toolbar":"Панель инструментов виджета","Insert paragraph before block":"Вставить параграф перед блоком","Insert paragraph after block":"Вставить параграф после блока","Press Enter to type after or press Shift + Enter to type before the widget":"Нажмите Enter для ввода текста после виджета или нажмите Shift + Enter для ввода текста перед виджетом","Keystrokes that can be used when a widget is selected (for example: image, table, etc.)":"Нажатия клавиш, которые можно использовать при выборе виджета (например: изображение, таблица и т. д.)","Insert a new paragraph directly after a widget":"Вставить новый абзац непосредственно после виджета.","Insert a new paragraph directly before a widget":"Вставить новый абзац непосредственно перед виджетом.","Move the caret to allow typing directly before a widget":"Переместите курсор, чтобы можно было вводить текст непосредственно перед виджетом.","Move the caret to allow typing directly after a widget":"Переместить курсор, чтобы можно было вводить текст сразу после виджета.","Move focus from an editable area back to the parent widget":"Переместите фокус с редактируемой области обратно на родительский виджет"},getPluralForm(n){return (n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, dictionary );
e[ 'ru' ].getPluralForm = getPluralForm;
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
