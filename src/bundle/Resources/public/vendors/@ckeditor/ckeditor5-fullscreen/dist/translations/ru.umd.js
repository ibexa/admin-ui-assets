/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"Enter fullscreen mode":"Войти в полноэкранный режим","Leave fullscreen mode":"Выйти из полноэкранного режима","Fullscreen mode":"Полноэкранный режим","Toggle fullscreen mode":"Переключить полноэкранный режим","Document outline":"Состав документа","Connected users":"Подключенные пользователи","Show left sidebar":"Показать левую боковую панель","Hide left sidebar":"Скрыть левую боковую панель","Toggle sidebar":"Переключить боковую панель"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
