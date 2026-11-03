/**
 * @license Copyright (c) 2003-2026, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-licensing-options
 */

( e => {
const { [ 'ru' ]: translations } = {"ru":{"dictionary":{"media widget":"медиа-виджет","Media URL":"URL медиа","Paste the media URL in the input.":"Вставьте URL медиа в поле ввода.","Tip: Paste the URL into the content to embed faster.":"Подсказка: Вставьте URL в контент для быстрого включения.","The URL must not be empty.":"URL не должен быть пустым.","This media URL is not supported.":"Этот URL медиа не поддерживается.","Insert media":"Вставить медиа","Media embed":"Внедрение мультимедиа","Media":"Медиа","Media toolbar":"Панель инструментов медиа","Open media in new tab":"Откройте медиа в новой вкладке","Left aligned media":"Медиа, выровненное по левому краю","Centered media":"Медиа по центру","Right aligned media":"Медиа, выровненное по правому краю","Resize media":"Изменить размер медиа","Resize media to %0":"Изменить размер медиа до %0","Resize media to the original size":"Вернуть медиа к исходному размеру","Resize media (in %0)":"Изменить размер медиа (в %0)","Custom media size":"Пользовательский размер медиа","Media resize list":"Список размеров медиа","Media Resize":"Изменение размера медиа"}}};
e[ 'ru' ] ||= { dictionary: {}, getPluralForm: null };
e[ 'ru' ].dictionary = Object.assign( e[ 'ru' ].dictionary, translations.dictionary );
if ( translations.getPluralForm ) {
e[ 'ru' ].getPluralForm = translations.getPluralForm;
}
} )( window.CKEDITOR_TRANSLATIONS ||= {} );
