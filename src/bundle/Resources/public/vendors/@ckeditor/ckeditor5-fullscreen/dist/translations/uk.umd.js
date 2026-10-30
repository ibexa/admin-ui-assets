/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'uk' ]: translations } = {"uk":{"dictionary":{"Enter fullscreen mode":"Задіяти повноекранний режим","Leave fullscreen mode":"Вийти з повноекранного режиму","Fullscreen mode":"Повноекранний режим","Toggle fullscreen mode":"Увімкнути повноекранний режим","Document outline":"Структура документа","Connected users":"Підключені користувачі","Show left sidebar":"Показати ліву бічну панель","Hide left sidebar":"Сховати ліву бічну панель","Toggle sidebar":"Показати/сховати бічну панель"}}};
e[ 'uk' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'uk' ].dictionary = Object.assign( e[ 'uk' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'uk' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
